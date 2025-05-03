'use client';

import { toPng } from 'html-to-image';
import React from 'react';

interface DownloadButtonProps {
  elementRef: React.RefObject<HTMLDivElement>;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ elementRef }) => {
  const downloadImage = () => {
    if (elementRef.current) {
      toPng(elementRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'photobooth.png';
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <button onClick={downloadImage} className="px-4 py-2 bg-green-500 text-white rounded">
      Download
    </button>
  );
};

export default DownloadButton;