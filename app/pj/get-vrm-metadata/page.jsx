import "./page.scss";
import SectionVRMMetadata from "@/components/sections/pj/get-vrm-metadata";


export const metadata = {
  title: "Wave on click | Fiber | yslim",
  description: "My playground",
};

const PageVRMMetadata = () => {
  return (
    <main className="page">
      <SectionVRMMetadata/>
    </main>
  );
};

export default PageVRMMetadata;
