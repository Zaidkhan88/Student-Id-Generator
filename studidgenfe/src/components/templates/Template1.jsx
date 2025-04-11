import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Template1= ({ student }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={student.photo || 'https://via.placeholder.com/100'}
        alt="student"
        className="w-24 h-24 rounded border object-cover"
      />
      <div>
        <h2 className="font-bold text-lg">{student.name}</h2>
        <p>Roll No: {student.rollNumber}</p>
        <p>Class: {student.classDivision}</p>
        <p>Rack No: {student.rackNumber}</p>
        <p>Bus Route: {student.busRoute}</p>
      </div>
    </div>
  );
};

export default Template1;
