'use client';

interface TemplatesProps {
  onSelectTemplate: (template: { id: number; style: string }) => void;
}

const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate }) => {
  const templates = [
    { id: 1, name: 'Red Template', style: 'bg-red-500' },
    { id: 2, name: 'Blue Template', style: 'bg-blue-500' },
  ];

  return (
    <div className="mb-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`p-4 cursor-pointer ${template.style}`}
          onClick={() => onSelectTemplate(template)}
        >
          {template.name}
        </div>
      ))}
    </div>
  );
};

export default Templates;