import SectionDefaultGlsl from "components/sections/fiber/default-glsl";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default glsl shader | Fiber | yslim",
  description: "My playground",
};

const DefaultGlslPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionDefaultGlsl />
    </main>
  );
};

export default DefaultGlslPage;
