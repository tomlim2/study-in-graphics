import SectionSlicedModel from "@/components/sections/fiber/sliced-model";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | Sliced Model | yslim",
  description: "Sliced model with Fiber",
};

const PageSlicedModel = () => {

  return (
    <main className={styles.page}>
      <SectionSlicedModel />
    </main>
  );
};

export default PageSlicedModel;
