import "./page.scss";
import SectionFollowMouseComponent from "@/components/sections/pj/follow-mouse-component";


export const metadata = {
  title: "Follow mouse component | Fiber | yslim",
  description: "My playground",
};

const PageFollowMouseComponent = () => {
  return (
    <main className="page">
      <SectionFollowMouseComponent />
    </main>
  );
};

export default PageFollowMouseComponent;
