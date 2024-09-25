import SectionRippleOnClick from "@/components/sections/pj/ripple-on-click";
import "./page.scss";
import SectionWaveOnClick from "@/components/sections/pj/wave-on-click";


export const metadata = {
  title: "Ripple on click | Fiber | yslim",
  description: "My playground",
};

const RippleOnClick = () => {
  return (
    <main className="page">
      <SectionRippleOnClick/>
    </main>
  );
};

export default RippleOnClick;
