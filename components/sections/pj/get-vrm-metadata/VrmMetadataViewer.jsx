import { useState, useEffect } from 'react';
import { loadVrmMetadata } from './loadVrmMetadata';


const VrmMetadataViewer = ({ vrmUrl }) => {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadVrmMetadata(vrmUrl)
        .then((meta) => setMetadata(meta))
        .catch((err) => setError(err));
    }
  }, [vrmUrl]);

  // Handle error by rendering error message string
  if (error) {
    return <div>Error: {error.message || error.toString()}</div>; // Ensure it's a string
  }

  if (!metadata) {
    return <div>Loading metadata...</div>;
  }
  return (
    <div>
      <h3>VRM Metadata</h3>
      <p>Title: {metadata.title}</p>
      <p>Author: {metadata.author}</p>
      <p>License: {metadata.licenseName}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default VrmMetadataViewer;