import SectionTextCoffee from "components/sections/fiber/text-coffee";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "My playground",
};

const DefaultPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionTextCoffee />
    </main>
  );
};

export default DefaultPage;
