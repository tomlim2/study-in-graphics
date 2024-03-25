import SectionFireworks from "@/components/sections/fiber/fireworks";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "My playground",
};

const FireworksPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionFireworks />
    </main>
  );
};

export default FireworksPage;
