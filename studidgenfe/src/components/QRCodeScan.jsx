import React, { useRef, useState } from 'react';
import axios from 'axios';

function QRScan() {
  const [scannedID, setScannedID] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const fileInputRef = useRef();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const imageDataUrl = reader.result;
      const image = new Image();
      image.src = imageDataUrl;

      image.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const jsQR = (await import('jsqr')).default;
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          const id = code.data.trim();
          setScannedID(id);
          fetchStudent(id);
        } else {
          alert("No QR code found in the uploaded image.");
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const fetchStudent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${id}`);
      console.log("Student fetched:", response.data);
      setStudentData(response.data);
    } catch (err) {
      console.error("Failed to fetch student:", err.response?.data || err.message);
      alert("Student not found for scanned ID.");
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">📤 Upload QR Code Image (ID Card)</h2>

      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Upload QR Code Image
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

      {scannedID && (
        <p className="mt-4 text-gray-700">
          <strong>Scanned ID:</strong> {scannedID}
        </p>
      )}

      {studentData && (
        <div className="bg-white shadow-md p-4 rounded mt-6 max-w-md">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">🎓 Student Info</h3>
          <p><strong>Name:</strong> {studentData.name}</p>
          <p><strong>Class:</strong> {studentData.class}</p>
          <p><strong>Dvision:</strong> {studentData.division}</p>
          <p><strong>Roll Number:</strong> {studentData.rollNumber}</p>
          <p><strong>Rack Number:</strong> {studentData.rackNumber}</p>
          <p><strong>Allergies:</strong> {studentData.allergies.join(', ')}</p>
          </div>
      )}
    </div>
  );
}

export default QRScan;
