import SectionRenderTarget from "@/components/sections/pj/render-target/index";
import "./page.scss";

export const metadata = {
  title: "Render target | Fiber | yslim",
  description: "My playground",
};

const PageRenderTarget = () => {
  return (
    <main className="page">
      <SectionRenderTarget/>
    </main>
  );
};

export default PageRenderTarget;
