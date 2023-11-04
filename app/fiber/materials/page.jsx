import SectionMaterials from "../../../components/sections/fiber/materials";
import styles from "./page.module.scss";

export const metadata = {
    title: "Materials | Fiber | yslim",
    description: "My playground",
};

const Materials = () => {
    return (
        <main className={styles.page}>
            <SectionMaterials />
        </main>
    );
};

export default Materials;
