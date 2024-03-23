import SectionEarth from "components/sections/fiber/earth";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "My playground",
};

const EarthPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionEarth />
    </main>
  );
};

export default EarthPage;