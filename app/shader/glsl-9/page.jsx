import SectionGlsl9 from "components/sections/shader/glsl-9";
import styles from "./page.module.scss";

export const metadata = {
  title: "glsl-9 | shader | yslim",
  description: "glsl about particles",
};

const PageGlsl9 = () => {
  
  return (
    <main className={styles.page}>
      <SectionGlsl9 />
    </main>
  );
};

export default PageGlsl9;
