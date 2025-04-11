import React, { useRef } from 'react';
import { QRCode } from 'qrcode.react';
import { toPng } from 'html-to-image';

const StudentIDCard = ({ data, selectedTemplate }) => {
  const cardRef = useRef();

  const handleDownload = () => {
    if (cardRef.current) {
      toPng(cardRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${data.name}_IDCard.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Failed to download:', err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div
        ref={cardRef}
        className={`w-[320px] p-4 rounded-lg shadow-lg border-2 ${
          selectedTemplate === 'template2' ? 'bg-gradient-to-r from-blue-50 to-blue-100' : 'bg-white'
        }`}
      >
        <div className="flex flex-col items-center">
          <img
            src={data.photo}
            alt={data.name}
            className="w-24 h-24 object-cover rounded-full border mb-3"
          />
          <h2 className="text-lg font-bold">{data.name}</h2>
          <p className="text-sm text-gray-600">
            Roll No: {data.rollNumber} <br />
            Class: {data.class} {data.division}
          </p>

          {data.allergies && data.allergies.length > 0 && (
            <p className="text-sm mt-2">
              <span className="font-semibold">Allergies:</span> {data.allergies.join(', ')}
            </p>
          )}

          <p className="text-sm mt-1">🗃️ Rack: {data.rackNumber}</p>
          <p className="text-sm">🚌 Bus Route: {data.busRoute}</p>

          <div className="mt-4">
            <QRCode value={JSON.stringify(data)} size={96} />
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Download as PNG
      </button>
    </div>
  );
};

export default StudentIDCard;
