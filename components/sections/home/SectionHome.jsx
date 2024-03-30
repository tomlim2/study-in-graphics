import styles from "./sectionHome.module.scss";
import Link from "next/link";
import { inProgressList, historyList } from "./homeContentLists";

const SectionHome = () => {
    return (
        <section className={styles["section-home"]}>
            <ul className={styles['list']}>
                {inProgressList.map((categoryItem, categoryIndex) => {
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
                })}
            </ul>
            <ul className={`${styles.list} ${styles.history}`}>
                {historyList.map((categoryItem, categoryIndex) => {
                    return (
                        <li className={styles['category']} key={categoryIndex}>
                            <h2 className={styles['category-name']}>
                                {categoryItem.categoryName}
                            </h2>
                            <ul className={styles['url-list']}>
                                {categoryItem.urlList.map((routeItem, routeIndex) => {
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
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default SectionHome;
