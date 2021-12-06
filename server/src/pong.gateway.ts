import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { tmpdir } from 'os';

@WebSocketGateway(4000, { namespace: 'pong', cors: true })
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  waitPlayer = 0;
  tmpRoomID = "";
  roomIDstates = new Map<string, [boolean, boolean]>()


  // connect socket
  public async handleConnection(@ConnectedSocket() socket: Socket) {
  }

  public async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('client-to-server-request-room-id')
  handleRequestRoomID(@ConnectedSocket() socket: Socket): void {
    let playerID = 0;
    if (this.waitPlayer == 1) {
      socket.join(this.tmpRoomID);
      this.waitPlayer = 0;
      playerID = 2;
      console.log('2nd player connected');
    } else {
      this.tmpRoomID = Math.random().toString(36).substr(2, 9);
      this.roomIDstates.set(this.tmpRoomID, [false, false]);
      console.log(this.tmpRoomID);
      socket.join(this.tmpRoomID);
      this.waitPlayer++;
      playerID = 1;
      console.log('1st client connected');
    }
    // this.server.to(this.tmpRoomID).emit('server-to-client-room-id', { roomID: this.tmpRoomID });
    socket.emit('server-to-client-room-id', { roomID: this.tmpRoomID, playerID: playerID });
  }

  @SubscribeMessage('client-to-server-ball-position')
  handleBall(@ConnectedSocket() socket: Socket, @MessageBody() payload: { roomID: string, player: number, ballPosition: [number, number, number] }): void {
    /*
    if (payload.player === 2) {
      return
    }
    */
    // io.sockets.emit
    //this.server.to(payload.roomID).emit('server-to-client-ball-position', { player: payload.player, ballPosition: payload.ballPosition });
    // console.log('roomID: ', payload.roomID, ', player: ', payload.player, ', position: ', payload.ballPosition);
    // socket.broadcast.emit('server-to-client-ball-position', { player: payload.player, ballPosition: payload.ballPosition });
    this.server.emit('server-to-client-ball-position', { player: payload.player, ballPosition: payload.ballPosition });
  }

  // キーイベントがクライアントから来た
  @SubscribeMessage('client-to-server-player-position')
  handlePlayerPaddle(@ConnectedSocket() socket: Socket, @MessageBody() payload: { roomID: string, player: number, paddlePosition: [number, number, number] }): void {
    // 他のクライアントの敵を動かす
    // broadcast
    // this.server.broadcast.emit('server-to-client-player-position', { player: payload.player, paddlePosition: payload.paddlePosition });
    // socket.broadcast.to(payload.roomID).emit('server-to-client-player-position', { player: payload.player, paddlePosition: payload.paddlePosition });

    // console.log('roomID: ', payload.roomID, ', player: ', payload.player, ', position: ', payload.paddlePosition);
    socket.broadcast.emit('server-to-client-player-position', { player: payload.player, paddlePosition: payload.paddlePosition });
  }

  // クライアントのroomIDが準備OK
  @SubscribeMessage('client-to-server-room-id-ready')
  handleRoomIDReady(@ConnectedSocket() socket: Socket, @MessageBody() payload: { roomID: string, player: number }): void {
    console.log("player : ", payload.player, "roomID: ", payload.roomID);
    let state = this.roomIDstates.get(payload.roomID);
    console.log(state);

    state[payload.player - 1] = true;
    this.roomIDstates.set(payload.roomID, state);

    console.log("player : ", payload.player);
    const newState = this.roomIDstates.get(payload.roomID);
    if (newState[0] === true && newState[1] === true) {
      this.server.emit('server-to-client-game-start');
    }
  }

  @SubscribeMessage('client-to-server-points')
  handlePointsChange(@ConnectedSocket() socket: Socket, @MessageBody() payload: { points: number[] }): void {
    console.log("save game points: ", payload.points);
    socket.broadcast.emit('server-to-client-points', {points: payload.points})
  }
}
