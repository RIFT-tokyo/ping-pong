import { Text } from "@react-three/drei";

const Info: React.VFC<{points: number[]}> = ({points}) => {
	return (
		<Text
			color="white"
			anchorX="center"
			anchorY="middle"
			fontSize={5}
			font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
			position={[0, 10, 0]}
		>
			Pong! {points[0]} - {points[1]}
		</Text>
	);
}

export default Info;