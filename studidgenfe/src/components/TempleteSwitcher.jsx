import React from 'react';

const TemplateSwitcher = ({ selectedTemplate, setSelectedTemplate }) => {
  return (
    <div className="mb-6 flex justify-center">
      <label className="mr-2 font-medium text-gray-700">Select Template:</label>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
      </select>
    </div>
  );
};

export default TemplateSwitcher;
