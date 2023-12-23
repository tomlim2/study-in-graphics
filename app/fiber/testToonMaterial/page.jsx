import SectionTestToon from "../../../components/sections/fiber/testToon";
import styles from "./page.module.scss";

export const metadata = {
  title: "Model emoji 1 | Fiber | yslim",
  description: "My playground",
};

const TestToonPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionTestToon />
    </main>
  );
};

export default TestToonPage;
