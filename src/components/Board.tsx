import { usePlane } from "@react-three/cannon"
import { useTexture } from '@react-three/drei';
//const img = require('../../public/texture/test.jpeg');

const Board: React.VFC<{position?: [x: number, y: number, z: number]}> = (props) => {
	const [ ref ] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
	// useFrame((state, delta) => {})
	const property = useTexture({
		map: 'https://images.pexels.com/photos/3934512/pexels-photo-3934512.jpeg?cs=srgb&dl=pexels-sam-willis-3934512.jpg&fm=jpg',
	})

	return (
	  <mesh
		ref={ref}
		receiveShadow
		>
		<planeBufferGeometry args={[20, 40]} />
		<meshStandardMaterial {...property} />
		<meshStandardMaterial />
	  </mesh>
	)
  }

  export default Board;