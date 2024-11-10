import SectionFollowMouse from "@/components/sections/pj/follow-mouse";
import "./page.scss";
import SectionDragInteraction from "@/components/sections/pj/drag-interaction";


export const metadata = {
  title: "Follow mouse | Fiber | yslim",
  description: "My playground",
};

const TowardsCenter = () => {
  return (
    <main className="page">
      <SectionFollowMouse />
    </main>
  );
};

export default TowardsCenter;
