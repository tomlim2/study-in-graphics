import { atom } from "recoil";

export const currentShaderIndex = atom({
  key: "currentShaderIndex",
  default: 0,
});

export const isDebuggerState = atom({
  key: "isDebbuger",
  default: false,
});