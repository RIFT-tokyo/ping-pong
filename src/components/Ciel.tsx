import { usePlane } from "@react-three/cannon"

const Ciel: React.VFC<{position?: [x: number, y: number, z: number]}> = (props) => {
	const [ ref ] = usePlane(() => ({ rotation: [Math.PI / 2, 0, 0], ...props }))
	// useFrame((state, delta) => {})
	return (
	  <mesh
		ref={ref}
		>
		<planeBufferGeometry args={[20, 40]} />
		<meshStandardMaterial color="orange" />
	  </mesh>
	)
  }

  export default Ciel;