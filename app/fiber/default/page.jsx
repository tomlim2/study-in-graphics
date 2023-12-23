import SectionDefault from "components/sections/fiber/default";
import styles from "./page.module.scss";

export const metadata = {
  title: "Model emoji 1 | Fiber | yslim",
  description: "My playground",
};

const DefaultPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionDefault />
    </main>
  );
};

export default DefaultPage;
