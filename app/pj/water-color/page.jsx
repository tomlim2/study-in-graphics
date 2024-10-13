import "./page.scss";
import SectionWaterColor from "@/components/sections/pj/water-color";


export const metadata = {
  title: "Water Color | Fiber | yslim",
  description: "My playground",
};

const PageWaterColor = () => {
  return (
    <main className="page">
      <SectionWaterColor/>
    </main>
  );
};

export default PageWaterColor;
