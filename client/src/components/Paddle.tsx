import { useFrame } from "@react-three/fiber"
import { useBox } from "@react-three/cannon"
import { position } from "../type/position"
import useSound from 'use-sound';
import ping from '../resources/ping.mp3';

const Paddle: React.VFC<{position: position}> = ({ position }) => {
	const [play] = useSound(ping, {volume: 1});
	const [ref, api] = useBox(() => ({
		args: [3, 1, 1],
		position: position,
		onCollide: () => {
			play()
			// console.log('collide');
		},
}))

	useFrame(() => {
		api.position.set(position[0], position[1], position[2])
	})
	return (
	  <mesh
			ref={ref}
			receiveShadow
		>
			<boxBufferGeometry args={[3, 1, 1]}/>
			<meshNormalMaterial/>
	  </mesh>
	)
}

export default Paddle;