import SectionGlsl6 from "components/sections/shader/glsl-6";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "My playground",
};

const Glsl6Page = () => {
  
  return (
    <main className={styles.page}>
      <SectionGlsl6 />
    </main>
  );
};

export default Glsl6Page;
