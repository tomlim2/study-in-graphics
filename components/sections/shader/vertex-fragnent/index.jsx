"use client";
import PostTime from "../common/postProject";
import VerFragA from "./patterns/verFragA";
import VerFragB from "./patterns/verFragB";
import "../common/section-shader.scss";

const aniList = [
  {
    info: "Pattern B: Particles",
    component: <VerFragB />,
  },
  {
    info: "Pattern A: Raging sea",
    component: <VerFragA />,
  },
];

const SectionVertexFragnent = () => {
  return (
    <div className="section-shader">
      <div className="container-shader">
        {aniList.map((item, index) => {
          return (
            <PostTime
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

export default SectionVertexFragnent;
