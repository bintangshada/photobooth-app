'use client';

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  onCapture: (image: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
      setError('Browser Anda tidak mendukung akses kamera.');
    }
  }, []);

  const capture = () => {
    try {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      } else {
        console.error('Gagal mengambil screenshot dari kamera.');
      }
    } catch (err) {
      console.error('Error saat mencoba mengakses kamera:', err);
    //   setError('Kamera tidak dapat diakses. Pastikan izin kamera telah diberikan.');
    }
  };

  if (!isSupported) {
    return <p className="text-red-500">Browser Anda tidak mendukung akses kamera.</p>;
  }

  return (
    <div className="mb-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-auto"
            onUserMediaError={(err) => {
              console.error('Error saat mencoba mengakses kamera:', err);
              setError(`error: ${err.message}`);
            }}
            onUserMedia={() => {
              console.log('Kamera berhasil diakses.');
            }}
          />
          <button onClick={capture} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Capture
          </button>
        </>
      )}
    </div>
  );
};

export default Camera;