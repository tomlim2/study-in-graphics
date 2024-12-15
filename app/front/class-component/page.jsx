import CounterReactClassExample from "./ClassExample";
// import "./page.scss";
import SectionVRMMetadata from "@/components/sections/front/get-vrm-metadata";


export const metadata = {
    title: "Class Extend | Front | yslim",
    description: "My playground",
};

const PageClassExtend = () => {
    return (
        <main className="page">
            <CounterReactClassExample />
        </main>
    );
};

export default PageClassExtend;
