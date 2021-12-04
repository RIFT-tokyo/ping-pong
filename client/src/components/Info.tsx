import Text from './Text';

const Info: React.VFC<{points: number[]}> = ({ points }) => {
	// 位置の調整
	const text = `Pong! ${points[0]} - ${points[1]}`;

	return (
		<Text position={[0, 5, 0]} text={text}/>
	)
}

export default Info;
