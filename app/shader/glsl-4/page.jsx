import SectionGlsl4 from "../../../components/sections/shader/glsl-4/index";
import styles from "./page.module.scss";
export const metadata = {
  title: "Glsl | Shader | yslim",
  description: "My playground",
};

const FragnentStill = () => {
  return (
    <main className={styles.page}>
      <SectionGlsl4 />
    </main>
  );
};

export default FragnentStill;
