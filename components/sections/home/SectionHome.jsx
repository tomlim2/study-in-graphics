import styles from "./sectionHome.module.scss";
import Link from "next/link";
import { inProgressList } from "./homeContentLists";

const ListStyleView = (categoryItem, categoryIndex) => {
    return (
        <li className={styles.category} key={categoryIndex}>
            <h2 className={styles['category-name']}>
                {categoryItem.categoryName}
            </h2>
            <ul className={styles['url-list']}>
                {categoryItem.urlList.map((routeItem, routeIndex) => {
                    return (
                        <li key={routeIndex} className={styles['url-link']}>
                            <Link href={routeItem.url}>{routeItem.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
}

const Thumbnails = (routeItem, routeIndex) => {
    return (
        <li key={routeIndex} className={styles['url-item']}>
            <Link href={routeItem.url}>
                <div className={styles.thumbnail}>
                    <img src={routeItem.thumbnail} alt="hi" />
                    <div className={styles["url-name-wrapper"]}>
                        <div className={styles["url-name"]}>
                            {routeItem.name}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

const ThumbnailStyleView = (categoryItem, categoryIndex) => {
    return (
        <li className={styles['category']} key={categoryIndex}>
            <h2 className={styles['category-name']}>
                {categoryItem.categoryName}
            </h2>
            <ul className={styles['url-list']}>
                {categoryItem.urlList.map((routeItem, routeIndex) => {
                    return Thumbnails(routeItem, routeIndex);
                })}
            </ul>
        </li>
    );
}

const SectionHome = () => {
    return (
        <>
            <section className={styles["section-home"]}>
                <ul className={styles['list']}>
                    {inProgressList.map((categoryItem, categoryIndex) => {
                        if (categoryItem.categoryName === "In progress" || categoryItem.categoryName === "To do") {
                            return ListStyleView(categoryItem, categoryIndex);
                        }
                    })}
                </ul>
                <ul className={`${styles.list} ${styles.history}`}>
                    {inProgressList.map((categoryItem, categoryIndex) => {
                        if (categoryItem.categoryName !== "In progress" && categoryItem.categoryName !== "To do") {
                            return ThumbnailStyleView(categoryItem, categoryIndex);
                        }
                    })}
                </ul>
            </section>
        </>

    );
};

export default SectionHome;
