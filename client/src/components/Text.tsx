import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import threeFontJson from 'three/examples/fonts/helvetiker_bold.typeface.json';

const Text: React.VFC<{ position: [number, number, number], text: string }> = ({ position, text }) => {
	// 位置の調整
	const textGeo = new TextGeometry(text, {
			font: new FontLoader().parse(threeFontJson),
			size: 4,
			height: 1
	})
	textGeo.computeBoundingBox()
	const centerOffset = -(textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x) / 2

	return (
		<mesh position={[position[0] + centerOffset, position[1], position[2]]} args={[textGeo]} castShadow receiveShadow>
			<meshPhongMaterial color="white" />
		</mesh>
	)
}

export default Text;