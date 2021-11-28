import { useSphere } from "@react-three/cannon"
import { useEffect } from "react"

const Ball: React.VFC<{position?: [x: number, y: number, z: number]}> = (props) => {
	const [ ref, api ] = useSphere(() => ({mass: 10, args: [0.5], ...props}))
	useEffect(() => {
		api.velocity.set(1, 0, 10)
	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [])
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
	  <mesh
		{...props}
		ref={ref}
		>
			<sphereBufferGeometry args={[0.5, 16, 16]} />
			<meshNormalMaterial wireframe />
	  </mesh>
	)
}

export default Ball;
