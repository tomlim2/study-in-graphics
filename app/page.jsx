import SectionHome from "@/components/sections/home/SectionHome";
import styles from "./page.module.scss";

export const metadata = {
  title: "Home | yslim",
  description: "Gathering my projects",
};

const PageHome = () => {
  return (
    <main className={styles.main}>
      <SectionHome />
    </main>
  );
};

export default PageHome;
