import SectionRippleOnClick from "@/components/sections/pj/ripple-on-click";
import "./page.scss";
import SectionWaveOnClick from "@/components/sections/pj/wave-on-click";
import SectionDragInteraction from "@/components/sections/pj/drag-interaction";


export const metadata = {
  title: "Drag interaction | Fiber | yslim",
  description: "My playground",
};

const RippleOnClick = () => {
  return (
    <main className="page">
      <SectionDragInteraction/>
    </main>
  );
};

export default RippleOnClick;