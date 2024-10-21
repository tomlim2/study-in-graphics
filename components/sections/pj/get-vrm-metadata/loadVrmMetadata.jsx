import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadVrmMetadata(vrmUrl) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            vrmUrl,
            (gltf) => {
                const vrmExtension = gltf.parser.json.extensions.VRM;
                if (vrmExtension) {
                    const metaData = vrmExtension.meta;
                    resolve(metaData);
                } else {
                    reject('No VRM metadata found');
                }
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
};
