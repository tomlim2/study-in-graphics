import SectionParticleCursor from "@/components/sections/fiber/particle-cursor";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "Particle cursor animation",
};

const ParticleCursorPage = () => {

  return (
    <main className={styles.page}>
      <SectionParticleCursor />
    </main>
  );
};

export default ParticleCursorPage;
