import "./page.scss";
import SectionFollowMouseAcc from "@/components/sections/pj/follow-mouse-acc";


export const metadata = {
  title: "Follow mouse | Fiber | yslim",
  description: "My playground",
};

const FollowMouseAcc = () => {
  return (
    <main className="page">
      <SectionFollowMouseAcc />
    </main>
  );
};

export default FollowMouseAcc;
