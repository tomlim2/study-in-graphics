import SectionGlsl5 from "../../../components/sections/shader/glsl-5/index";
import styles from "./page.module.scss";
export const metadata = {
  title: "Glsl | Shader | yslim",
  description: "My playground",
};

const FragnentStill = () => {
  return (
    <main className={styles.page}>
      <SectionGlsl5 />
    </main>
  );
};

export default FragnentStill;
