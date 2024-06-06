import styles from "./page.module.scss";
import SectionWobblySphere from "@/components/sections/fiber/wobbly-sphere";

export const metadata = {
  title: "Default | Fiber | Wobbly Sphere | yslim",
  description: "Wobbly sphere with Fiber",
};

const PageWobblySphere = () => {

  return (
    <main className={styles.page}>
      <SectionWobblySphere/>
    </main>
  );
};

export default PageWobblySphere;
