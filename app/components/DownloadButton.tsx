'use client';

import { RefObject } from 'react';
import { toPng } from 'html-to-image';

interface DownloadButtonProps {
  elementRef: RefObject<HTMLDivElement | null>;
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
    } else {
      console.error('Element tidak ditemukan untuk diunduh.');
    }
  };

  return (
    <button
      onClick={downloadImage}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
    >
      Download
    </button>
  );
};

export default DownloadButton;