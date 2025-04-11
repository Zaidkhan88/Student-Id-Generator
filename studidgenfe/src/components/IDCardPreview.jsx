import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';

function IDCardPreview({ student, template }) {
  const cardRef = useRef(null);

  const downloadCard = () => {
    if (cardRef.current === null) return;

    toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${student.name}_IDCard.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Download failed', err);
      });
  };

  const cardStyle =
    template === 'template1'
      ? 'bg-blue-100 border-blue-400'
      : 'bg-yellow-100 border-yellow-400';

  return (
    <div className="flex flex-col items-center">
      <div
        ref={cardRef}
        className={`w-[350px] border-2 ${cardStyle} p-4 rounded shadow-md text-sm`}
      >
        {template === 'template1' ? (
          <Template1 student={student} />
        ) : (
          <Template2 student={student} />
        )}

        {student.allergies && student.allergies.length > 0 && (
          <div className="mt-3">
            <strong>Allergies:</strong>
            <ul className="list-disc ml-5">
              {student.allergies.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <QRCodeSVG value={student._id} size={80} />
        </div>
      </div>

      <button
        onClick={downloadCard}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download as PNG
      </button>
    </div>
  );
}

export default IDCardPreview;
