import SectionDefaultShader from "components/sections/fiber/default-shader";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default shader | Fiber | yslim",
  description: "My playground",
};

const DefaultPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionDefaultShader />
    </main>
  );
};

export default DefaultPage;
