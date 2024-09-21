import "./page.scss";
import SectionSmokes from "@/components/sections/pj/smokes";


export const metadata = {
  title: "smokes | Fiber | yslim",
  description: "My playground",
};

const PageSmokes = () => {
  return (
    <main className="page">
      <SectionSmokes/>
    </main>
  );
};

export default PageSmokes;
