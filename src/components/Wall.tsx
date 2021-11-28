import { useBox } from "@react-three/cannon"
import { position } from "../type/position"

const Wall: React.VFC<{position: position}> = ({ position }) => {
	const [ ref ] = useBox(() => ({ args: [0.2, 1, 40], position: position }))

	return (
	  <mesh ref={ref} >
			<boxBufferGeometry args={[0.2, 1, 40]} />
			<meshNormalMaterial/>
	  </mesh>
	)
  }

export default Wall;