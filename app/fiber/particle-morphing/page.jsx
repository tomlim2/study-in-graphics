import styles from "./page.module.scss";
import SectionParticleMorphing from "@/components/sections/fiber/particle-morphing";

export const metadata = {
  title: "Default | Fiber | yslim",
  description: "Particle morphing",
};

const ParticleMorphingPage = () => {

  return (
    <main className={styles.page}>
      <SectionParticleMorphing />
    </main>
  );
};

export default ParticleMorphingPage;
