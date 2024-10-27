import SectionPhysicsInBox from "@/components/sections/fiber/physics-in-box";
import styles from "./page.module.scss";

export const metadata = {
  title: "Fiber | Physics in box | yslim",
  description: "Procedural Terrain with Fiber",
};

const PagePhysicsInBox = () => {

  return (
    <main className={styles.page}>
      <SectionPhysicsInBox />
    </main>
  );
};

export default PagePhysicsInBox;
