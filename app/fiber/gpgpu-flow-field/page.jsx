import SectionGPGPUFlowField from "@/components/sections/fiber/gpgpu-flow-field";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default | Fiber | GPGPU Flow Field | yslim",
  description: "GPGPU Flow Field with Fiber",
};

const GPGPUFlowFieldPage = () => {

  return (
    <main className={styles.page}>
      <SectionGPGPUFlowField/>
    </main>
  );
};

export default GPGPUFlowFieldPage;
