import SectionHome from "components/sections/home/SectionHome";
import "./page.scss";

export const metadata = {
  title: "Home | yslim",
  description: "Gathering my projects",
};

const PageHome = () => {
  return (
    <main className="page-home">
      <SectionHome />
    </main>
  );
};

export default PageHome;
