import { Color, DataTexture, DoubleSide, NearestFilter, RedFormat, TextureLoader } from "three";

export const DataTextureBuilt = (color = 0xffffff) => {
    const dataWidth = 512;
    const dataHeight = 512;
    const dataSize = dataWidth * dataHeight;
    const dataData = new Uint8Array(4 * dataSize);

    const dataColor = new Color(color);
    const dataR = Math.floor(dataColor.r * 255);
    const dataG = Math.floor(dataColor.g * 255);
    const dataB = Math.floor(dataColor.b * 255);

    for (let i = 0; i < dataSize; i++) {
        const stride = i * 4;
        dataData[stride] = dataR;
        dataData[stride + 1] = dataG;
        dataData[stride + 2] = dataB;
        dataData[stride + 3] = 255;
    }
    const dataTexture = new DataTexture(dataData, dataData.length, 1, RedFormat)
    dataTexture.needsUpdate = true

    return dataTexture
}