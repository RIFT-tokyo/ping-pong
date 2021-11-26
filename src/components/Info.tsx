const Info: React.VFC<{points: number[]}> = ({points}) => {
	return (
		<div style={{
			position: 'absolute',
			display: 'block',
			top: 50,
			left: 50,
			color: 'white',
			fontSize: '1.2em',
		}}>
			Pong! {points[0]} - {points[1]}
		</div>
	);
}

export default Info;