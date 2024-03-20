import SectionModelStrawberryCake from "@/components/sections/fiber/model-strawberry-cake";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default loader gltf | Fiber | yslim",
  description: "My playground",
};

const modelFishHugu = () => {

  return (
    <main className={styles.page}>
      <SectionModelStrawberryCake/>
    </main>
  );
};

export default modelFishHugu;
