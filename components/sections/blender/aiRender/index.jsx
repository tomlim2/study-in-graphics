import ListAndItemSimple from "components/common/ListAndItemSimple";
import { listBlender } from "./data";

import "../sectionBlender.scss";

const SectionBlender = () => {
  return (
    <section className="section-blender">
      <ListAndItemSimple list={listBlender} />
    </section>
  );
};

export default SectionBlender;
