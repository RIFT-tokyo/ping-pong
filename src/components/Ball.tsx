import { useSphere } from "@react-three/cannon"
import { useTexture } from "@react-three/drei"
import { useEffect } from "react"

const Ball: React.VFC<{position?: [x: number, y: number, z: number]}> = (props) => {
	const [ ref, api ] = useSphere(() => ({mass: 10, args: [0.5], ...props}))
	useEffect(() => {
		/* 0 < sin(x) < 1 */
		let x = (Math.random() * Math.PI / 2 + Math.PI / 4) * (Math.random() > 0.5 ? 1 : -1)
		api.velocity.set(10 * Math.cos(x), 0, 10 * Math.sin(x))
	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [])

	const property = useTexture({
		map: 'https://blenderartists.org/uploads/default/original/3X/8/1/814a32caf0901716e85e291d2a99018e549373cd.jpg',
	})
	return (
	  <mesh
		{...props}
		ref={ref}
		>
			<sphereBufferGeometry args={[0.5, 16, 16]} />
			{/* <meshNormalMaterial wireframe /> */}
			<meshStandardMaterial {...property} />
	  </mesh>
	)
}

export default Ball;
