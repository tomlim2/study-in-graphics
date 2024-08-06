import SectionCoffeeSmokeV2 from "components/sections/fiber/coffee-smoke-v2";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default loader gltf | Fiber | yslim",
  description: "My playground",
};

const PageCoffeeSmokeV2 = () => {
  
  return (
    <main className={styles.page}>
      <SectionCoffeeSmokeV2 />
    </main>
  );
};

export default PageCoffeeSmokeV2;
