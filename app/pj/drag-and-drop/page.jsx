import SectionDragAndDrop from "@/components/sections/pj/drag-n-drop";
import "./page.scss";
import SectionWaveOnClick from "@/components/sections/pj/wave-on-click";


export const metadata = {
  title: "Wave on click | Fiber | yslim",
  description: "My playground",
};

const PageDragAndDrop = () => {
  return (
    <main className="page">
      <SectionDragAndDrop/>
    </main>
  );
};

export default PageDragAndDrop;
