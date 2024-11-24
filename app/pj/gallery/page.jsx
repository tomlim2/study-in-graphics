import "./page.scss";
import SectionSmokes from "@/components/sections/pj/gallery";


export const metadata = {
  title: "Gallery | Fiber | yslim",
  description: "My playground",
};

const PageGallery = () => {
  return (
    <main className="page">
      <SectionSmokes/>
    </main>
  );
};

export default PageGallery;
