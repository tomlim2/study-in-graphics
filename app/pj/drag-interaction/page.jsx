import "./page.scss";
import SectionDragInteraction from "@/components/sections/pj/drag-interaction";


export const metadata = {
  title: "Towards center | Fiber | yslim",
  description: "My playground",
};

const TowardsCenter = () => {
  return (
    <main className="page">
      <SectionDragInteraction/>
    </main>
  );
};

export default TowardsCenter;
