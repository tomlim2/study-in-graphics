import SectionGlsl7 from "components/sections/shader/glsl-7";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "My playground",
};

const Glsl6Page = () => {
  
  return (
    <main className={styles.page}>
      <SectionGlsl7 />
    </main>
  );
};

export default Glsl6Page;
