import SectionLoaderGltf from "components/sections/fiber/default-loader-gltf";
import styles from "./page.module.scss";

export const metadata = {
  title: "Default loader gltf | Fiber | yslim",
  description: "My playground",
};

const DefaultGlslPage = () => {
  
  return (
    <main className={styles.page}>
      <SectionLoaderGltf />
    </main>
  );
};

export default DefaultGlslPage;
