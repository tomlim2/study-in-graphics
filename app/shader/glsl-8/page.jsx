import SectionGlsl8 from "components/sections/shader/glsl-8";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "My playground",
};

const Glsl6Page = () => {
  
  return (
    <main className={styles.page}>
      <SectionGlsl8 />
    </main>
  );
};

export default Glsl6Page;
