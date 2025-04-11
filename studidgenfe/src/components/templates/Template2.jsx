import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Template2 = ({ student }) => {
  return (
    <div>
      <div className="text-center">
        <img
          src={student.photo || 'https://via.placeholder.com/100'}
          alt="student"
          className="w-24 h-24 mx-auto rounded-full border object-cover"
        />
        <h2 className="font-extrabold text-xl mt-2">{student.name}</h2>
      </div>
      <div className="mt-3 space-y-1 text-center">
        <p><strong>Roll No:</strong> {student.rollNumber}</p>
        <p><strong>Class:</strong> {student.classDivision}</p>
        <p><strong>Rack No:</strong> {student.rackNumber}</p>
        <p><strong>Bus Route:</strong> {student.busRoute}</p>
      </div>
    </div>
  );
};

export default Template2;
