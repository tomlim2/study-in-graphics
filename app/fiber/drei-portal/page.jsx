import SectionDreiPortal from "components/sections/fiber/drei-portal";
import styles from "./page.module.scss";

export const metadata = {
  title: "Drei Portal | Fiber | yslim",
  description: "Drei Portal",
};

const DreiPortal = () => {
  return (
    <main className={styles.page}>
      <SectionDreiPortal />
    </main>
  );
};

export default DreiPortal;
