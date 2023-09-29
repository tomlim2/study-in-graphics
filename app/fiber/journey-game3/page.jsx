import SectionExperience from "@/components/sections/journey-game3/index";
import styles from "./page.module.scss";

export const metadata = {
  title: "Journey game 3 | Fiber | yslim",
  description: "From shuffle the blocks",
};

const Page = () => {
  return (
    <main className={styles.page}>
      <SectionExperience />
    </main>
  );
};

export default Page;
