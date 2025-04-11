import React from 'react';
import { useForm } from 'react-hook-form';

const classes = ['Class 1', 'Class 2', 'Class 3'];
const divisions = ['A', 'B', 'C'];
const allergiesOptions = ['Peanuts', 'Dairy', 'Dust', 'Pollen'];
const busRoutes = ['Route 1', 'Route 2', 'Route 3'];

const StudentForm = ({ onSubmit,selectedTemplate }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const watchPhoto = watch('photoPreview');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('photoPreview', reader.result);
        setValue('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async (data) => {
    try {
      data.template = selectedTemplate; // ✅ Add this line to attach template info
  
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save student to database');
      }
  
      const savedStudent = await response.json();
      onSubmit(savedStudent);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong while saving the student data.');
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4 max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Student Information</h2>

      <input
        {...register('name', { required: 'Name is required' })}
        placeholder="Name*"
        className="w-full p-2 border rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        {...register('rollNumber', { required: 'Roll Number is required' })}
        placeholder="Roll Number*"
        className="w-full p-2 border rounded"
      />
      {errors.rollNumber && <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>}

      <div className="flex gap-4">
        <select {...register('class')} className="p-2 border rounded w-1/2">
          <option value="">Select Class</option>
          {classes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select {...register('division')} className="p-2 border rounded w-1/2">
          <option value="">Select Division</option>
          {divisions.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Allergies:</legend>
        <div className="flex flex-wrap gap-4 mt-2">
          {allergiesOptions.map((allergy) => (
            <label key={allergy} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={allergy}
                {...register('allergies[]')}
              />
              {allergy}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="block mb-1 text-sm font-medium">Photo Upload:*</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
        {!watchPhoto && <p className="text-red-500 text-sm">Photo is required</p>}
        {watchPhoto && (
          <img
            src={watchPhoto}
            alt="Preview"
            className="w-24 h-24 object-cover rounded border"
          />
        )}
      </div>

      <input
        {...register('rackNumber')}
        placeholder="Rack Number"
        className="w-full p-2 border rounded"
      />

      <select {...register('busRoute')} className="w-full p-2 border rounded">
        <option value="">Select Bus Route</option>
        {busRoutes.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      <input type="hidden" {...register('photo')} />
      <input type="hidden" {...register('photoPreview')} />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Generate ID Card
      </button>
    </form>
  );
};

export default StudentForm;
