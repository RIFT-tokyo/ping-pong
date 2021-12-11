import { useBox } from "@react-three/cannon"
import { position } from "../type/position"
import useSound from 'use-sound';
import ping from '../resources/ping.mp3';

const Wall: React.VFC<{position: position}> = ({ position }) => {
	// const [play] = useSound(ping, {volume: 1});
	const [ ref ] = useBox(() => ({
		args: [0.2, 1, 40],
		position: position,
		// onCollide: () => {
		// 	// play()
		// 	// console.log('wall collide');
		// },
	}))

	return (
	  <mesh ref={ref} >
			<boxBufferGeometry args={[0.2, 1, 40]} />
			<meshStandardMaterial color="green"/>
	  </mesh>
	)
  }

export default Wall;