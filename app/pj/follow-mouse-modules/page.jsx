import SectionFollowMouse from "@/components/sections/pj/follow-mouse";
import "./page.scss";
import SectionDragInteraction from "@/components/sections/pj/drag-interaction";
import SectionFollowMouseModules from "@/components/sections/pj/follow-mouse-modules";


export const metadata = {
  title: "Follow mouse | Fiber | yslim",
  description: "My playground",
};

const TowardsCenter = () => {
  return (
    <main className="page">
      <SectionFollowMouseModules />
    </main>
  );
};

export default TowardsCenter;
