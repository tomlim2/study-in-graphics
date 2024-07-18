import styles from "./page.module.scss";
import SectionProceduralTerrain from "@/components/sections/fiber/procedural-terrain";

export const metadata = {
  title: "Default | Fiber | Procedural Terrain | yslim",
  description: "Procedural Terrain with Fiber",
};

const PageProceduralTerrain = () => {

  return (
    <main className={styles.page}>
      <SectionProceduralTerrain />
    </main>
  );
};

export default PageProceduralTerrain;
