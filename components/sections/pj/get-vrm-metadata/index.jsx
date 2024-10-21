"use client";
import { useState } from "react";
import "./SectionVRMMetadata.scss";
import VrmMetadataViewer from "./VrmMetadataViewer";


const SectionVRMMetadata = () => {
  const [vrmUrl, setVrmUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVrmUrl(url);
    }
  };
  return (
    <section className={'sectionVRMMetadata'}>
      <h1>VRM Metadata Viewer</h1>

      <input type="file" accept=".vrm" onChange={handleFileChange} />
      <VrmMetadataViewer vrmUrl={vrmUrl} />
    </section>
  );
};

export default SectionVRMMetadata;
