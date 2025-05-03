'use client';

interface GalleryProps {
  onSelect: (image: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onSelect(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default Gallery;