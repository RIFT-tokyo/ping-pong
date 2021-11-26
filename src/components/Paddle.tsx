// import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Mesh } from "three"

const Paddle: React.VFC<{position?: [x: number, y: number, z: number]}> = (props) => {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef({} as Mesh)
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// useFrame((state, delta) => {
	//   ref.current.rotation.x += 0.01
	//   ref.current.rotation.z += 0.01
	// })
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
	  <mesh
		{...props}
		ref={ref}
		onClick={(event) => click(!clicked)}
		onPointerOver={(event) => hover(true)}
		onPointerOut={(event) => hover(false)}>
		<boxBufferGeometry args={[3, 1, 1]} />
		<meshNormalMaterial wireframe={hovered ? true : undefined} />
	  </mesh>
	)
  }

  export default Paddle;