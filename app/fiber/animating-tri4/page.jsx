import SectionAnimatingTriangles from "components/sections/fiber/animating-tri4";
import "./page.scss";


export const metadata = {
  title: "Animating Triangles | Fiber | yslim",
  description: "My playground",
};

const Page = () => {
  return (
    <main className="page">
      <SectionAnimatingTriangles />
    </main>
  );
};

export default Page;
