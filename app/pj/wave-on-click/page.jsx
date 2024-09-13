import "./page.scss";
import SectionWaveOnClick from "@/components/sections/pj/wave-on-click";


export const metadata = {
  title: "Wave on click | Fiber | yslim",
  description: "My playground",
};

const PageWaveOnClick = () => {
  return (
    <main className="page">
      <SectionWaveOnClick/>
    </main>
  );
};

export default PageWaveOnClick;
