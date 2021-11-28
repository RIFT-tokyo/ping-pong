import { useFrame } from "@react-three/fiber"
import { useBox } from "@react-three/cannon"
import { position } from "../type/position"

const Paddle: React.VFC<{position: position}> = ({ position }) => {
	const [ ref, api ] = useBox(() => ({ args: [3, 1, 1], position: position}))

	useFrame(() => {
		api.position.set(position[0], position[1], position[2])
	})
	return (
	  <mesh ref={ref} >
			<boxBufferGeometry args={[3, 1, 1]}/>
			<meshNormalMaterial/>
	  </mesh>
	)
}

export default Paddle;