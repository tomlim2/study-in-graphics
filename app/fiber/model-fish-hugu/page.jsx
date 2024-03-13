import styles from "./page.module.scss";
import SectionModelFishHugu from "@/components/sections/fiber/model-fish-hugu";

export const metadata = {
  title: "Default loader gltf | Fiber | yslim",
  description: "My playground",
};

const modelFishHugu = () => {

  return (
    <main className={styles.page}>
      <SectionModelFishHugu />
    </main>
  );
};

export default modelFishHugu;
