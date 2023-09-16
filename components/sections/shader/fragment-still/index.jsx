"use client";
import ProjectGlslPatterns from "./GlslPatterns";
import ProjectBookOfShaders from "./BOS";
import "../common/section-shader.scss";

const stillList = [
  {
    info: "Pattern A",
    component: <ProjectBookOfShaders key={"s1"} />,
  },
  {
    info: "Pattern A",
    component: <ProjectGlslPatterns key={"s2"} />,
  },
];

const SectionFragnentStill = () => {
  return (
    <section className="section-shader">
      <div className="container-shader">
        {stillList.map((item, index) => {
          return item.component;
        })}
      </div>
    </section>
  );
};

export default SectionFragnentStill;
