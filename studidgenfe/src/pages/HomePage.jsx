// HomePage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import StudentForm from '../components/StudentForm';
import TemplateSwitcher from '../components/TempleteSwitcher';
import IDCardPreview from '../components/IDCardPreview';

function HomePage() {
  const [studentData, setStudentData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [savedCards, setSavedCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();

  // ✅ This function handles saving data from StudentForm
  const handleStudentSubmit = (savedStudent) => {
    setStudentData(savedStudent); // for preview
    setSavedCards((prev) => [...prev, savedStudent]); // track all saved cards
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          🎓 Student ID Card Generator
        </h1>
        <Link
          to="/scan"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Scan QR
        </Link>
      </div>

      <button
        onClick={() => navigate('/allCards')}
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        View All Cards
      </button>

      {showCards && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Saved ID Cards:</h2>
          <div className="flex flex-wrap gap-6">
            {savedCards.map((student, index) => (
              <IDCardPreview key={index} student={student} template="template1" />
            ))}
          </div>
        </div>
      )}

      <TemplateSwitcher
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      {/* ✅ Use custom submit handler */}
      <StudentForm onSubmit={handleStudentSubmit} selectedTemplate={selectedTemplate} />

      {studentData && (
        <div className="mt-10">
          <IDCardPreview student={studentData} template={selectedTemplate} />
        </div>
      )}
    </>
  );
}

export default HomePage;
