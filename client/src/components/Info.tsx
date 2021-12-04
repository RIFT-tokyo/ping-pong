import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import threeFontJson from 'three/examples/fonts/helvetiker_bold.typeface.json';

const Info: React.VFC<{points: number[]}> = ({ points }) => {
	// 位置の調整
	const text = `Pong! ${points[0]} - ${points[1]}`;
	const textGeo = new TextGeometry(text, {
			font: new FontLoader().parse(threeFontJson),
			size: 4,
			height: 1
	})
	textGeo.computeBoundingBox()
	const centerOffset = -(textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x) / 2

	return (
		<mesh position={[centerOffset, 5, 0]} args={[textGeo]} castShadow receiveShadow>
			<meshPhongMaterial color="white" />
		</mesh>
	)
}


export default Info;
