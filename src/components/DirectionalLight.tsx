import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper, Object3D } from "three";
import { position } from "../type/position";

const DirectionalLight: React.VFC<{ position?: position, target?: Object3D }> = ({ position, target }) => {
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper);

  return (
    <directionalLight
      ref={lightRef}
      position={position}
      intensity={0.3}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      target={target}
      castShadow
    />
  )
}

export default DirectionalLight;