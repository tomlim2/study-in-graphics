import SectionDefault from "components/sections/fiber/default";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "My playground",
};

const FireworksPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionDefault />
    </main>
  );
};

export default FireworksPage;
