import { Text } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

const Text2D: React.VFC<{ position: [number, number, number], text: string, onClick?: ((event: ThreeEvent<MouseEvent>) => void) }>  = ({ position, text, onClick }) => {
  return (
    <Text
      color="white"
      anchorX="center"
      anchorY="middle"
      fontSize={5}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      position={position}
      onClick={onClick}
    >
      {text}
    </Text>
  );
}

export default Text2D;