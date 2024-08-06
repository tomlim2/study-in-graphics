import SectionThreeDText from "components/sections/fiber/three-d-text";
import styles from "./page.module.scss";

export const metadata = {
  title: "3D Text | Fiber | yslim",
  description: "My playground",
};

const PageThreeDText = () => {
  
  return (
    <main className={styles.page}>
      <SectionThreeDText />
    </main>
  );
};

export default PageThreeDText;
