import "./sectionHome.scss";
import Link from "next/link";
import { inProgressList, historyList } from "./homeContentLists";

const SectionHome = () => {
    return (
        <section className="section-home">
            <ul className='list in-progress'>
                {inProgressList.map((categoryItem, categoryIndex) => {
                    return (
                        <li className='category' key={categoryIndex}>
                            <h2 className='category-name'>
                                {categoryItem.categoryName}
                            </h2>
                            <ul className='url-list'>
                                {categoryItem.urlList.map((routeItem, routeIndex) => {
                                    return (
                                        <li key={routeIndex} className='url-link'>
                                            <Link href={routeItem.url}>{routeItem.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            <ul className='list history'>
                {historyList.map((categoryItem, categoryIndex) => {
                    return (
                        <li className='category' key={categoryIndex}>
                            <h2 className='category-name'>
                                {categoryItem.categoryName}
                            </h2>
                            <ul className='url-list'>
                                {categoryItem.urlList.map((routeItem, routeIndex) => {
                                    return (
                                        <li key={routeIndex} className='url-item'>
                                            <Link href={routeItem.url}>
                                                <div className="thumbnail">
                                                    <img src={routeItem.thumbnail} alt="hi" />
                                                    <div className="url-name-wrapper">
                                                        <div className="url-name">
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
