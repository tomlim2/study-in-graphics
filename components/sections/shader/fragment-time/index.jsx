"use client";
import PostProject from "../common/postProject";
import { shaderManager } from "./shaderManager";
import "../common/section-shader.scss";

const SectionFragnentTime = () => {
  return (
    <div className="section-shader">
      <div className="container-shader">
        {shaderManager.map((item, index) => {
          return (
            <PostProject
              key={index}
              shaderIndex={index}
              canvasComponent={item.component}
              info={item.info}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SectionFragnentTime;
