import SectionGlsl3 from "../../../components/sections/shader/glsl-3/index";
import styles from "./page.module.scss";
export const metadata = {
  title: "Glsl | Shader | yslim",
  description: "My playground",
};

const FragnentStill = () => {
  return (
    <main className={styles.page}>
      <SectionGlsl3 />
    </main>
  );
};

export default FragnentStill;
