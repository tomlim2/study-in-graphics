import SectionCoffeeSmoke from "components/sections/fiber/coffee-smoke";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default loader gltf | Fiber | yslim",
  description: "My playground",
};

const DefaultGlslPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionCoffeeSmoke />
    </main>
  );
};

export default DefaultGlslPage;
