import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(4000, { namespace: 'pong', cors: true })
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  waitPlayer = 0;
  tmpRoomID = "";

  // connect socket
  public async handleConnection(@ConnectedSocket() socket: Socket) {
    if (this.waitPlayer == 1) {
      socket.join(this.tmpRoomID);
      this.waitPlayer = 0;
      console.log('2nd player connected');
    } else {
      this.tmpRoomID = Math.random().toString(36).substr(2, 9);
      socket.join(this.tmpRoomID);
      this.waitPlayer++;
      console.log('1st client connected');
    }
    // this.server.to(this.tmpRoomID).emit('server-to-client-room-id', { roomID: this.tmpRoomID });
    this.server.emit('server-to-client-room-id', { roomID: this.tmpRoomID });
  }

  public async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('Client disconnected');
  }

  // @SubscribeMessage('client-to-server-ball-position')
  // handleBall(@ConnectedSocket() socket: Socket, @MessageBody() payload: { roomID: string, player: number, ballPosition: [number, number, number] }): void {
  //   if (payload.player === 2) {
  //     return
  //   }
  //   // io.sockets.emit
  //   //this.server.to(payload.roomID).emit('server-to-client-ball-position', { player: payload.player, ballPosition: payload.ballPosition });
  //   this.server.emit('server-to-client-ball-position', { player: payload.player, ballPosition: payload.ballPosition });
  // }

  // キーイベントがクライアントから来た
  @SubscribeMessage('client-to-server-player-position')
  handlePlayerPaddle(@ConnectedSocket() socket: Socket, @MessageBody() payload: { roomID: string, player: number, paddlePosition: [number, number, number] }): void {
    // 他のクライアントの敵を動かす
    // broadcast
    // this.server.broadcast.emit('server-to-client-player-position', { player: payload.player, paddlePosition: payload.paddlePosition });
    // socket.broadcast.to(payload.roomID).emit('server-to-client-player-position', { player: payload.player, paddlePosition: payload.paddlePosition });
    console.log('ition: ' + payload.paddlePosition);
    this.server.emit('server-to-client-player-position', { player: payload.player, paddlePosition: payload.paddlePosition });
  }

}
