import SectionMaterials from "../../../components/sections/fiber/materials";
import styles from "./page.module.scss";

export const metadata = {
    title: "Material List | Fiber | yslim",
    description: "Material list",
};

const Materials = () => {
    return (
        <main className={styles.page}>
            <SectionMaterials />
        </main>
    );
};

export default Materials;
