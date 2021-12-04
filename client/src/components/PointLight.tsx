import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { PointLightHelper } from "three";
import { position } from "../type/position";

const PointLight: React.VFC<{ position?: position }> = ({ position }) => {
  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper);

  return (
    <pointLight
      ref={lightRef}
      position={position}
      intensity={0.7}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      castShadow
    />
  )
}

export default PointLight;