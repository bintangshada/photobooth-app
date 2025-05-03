'use client';

import { useState, useRef } from 'react';
import Camera from './components/Camera';
import Gallery from './components/Gallery';
import Templates from './components/Templates';
import DownloadButton from './components/DownloadButton';
import Image from 'next/image';

export default function PhotoboothPage() {
  const [images, setImages] = useState<string[]>([]);
  const [template, setTemplate] = useState<{ id: number; style: string } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCapture = (image: string) => {
    if (images.length < 3) {
      setImages((prev) => [...prev, image]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Photobooth</h1>
      <Camera onCapture={handleCapture} />
      <Gallery onSelect={(image) => handleCapture(image)} />
      <Templates onSelectTemplate={setTemplate} />
      {images.length > 0 && (
        <div
          ref={previewRef}
          className={`grid grid-cols-3 gap-4 p-4 ${template?.style || ''}`}
        >
          {/* Tampilkan gambar dalam 2 baris dan 3 kolom */}
          {Array(2)
            .fill(null)
            .map((_, rowIndex) =>
              images.map((image, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="border p-2">
                  <Image src={image} alt={`Captured ${colIndex}`} className="max-w-full" />
                </div>
              ))
            )}
        </div>
      )}
      {images.length >= 3 && <DownloadButton elementRef={previewRef} />}
      {images.length < 3 && (
        <p className="text-red-500 mt-4">
          Anda harus mengambil minimal 3 foto sebelum dapat mengunduh.
        </p>
      )}
    </div>
  );
}