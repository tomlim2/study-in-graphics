import styles from "./page.module.scss";
import SectionHologram from "components/sections/fiber/hologram";

export const metadata = {
  title: "Default loader gltf | Fiber | yslim",
  description: "My playground",
};

const HolgramPage = () => {

  return (
    <main className={styles.page}>
      <SectionHologram />
    </main>
  );
};

export default HolgramPage;
