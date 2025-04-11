import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IDCardPreview from './IDCardPreview'; // adjust path if needed

function AllCards() {
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allStudents');
        console.log('Fetched cards:', response.data);
        setSavedCards(response.data);
      } catch (error) {
        console.error('Error fetching saved cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      // Filter out the deleted card from the state
      setSavedCards((prev) => prev.filter((card) => card._id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📇 All Student ID Cards</h2>

      {loading ? (
        <p>Loading...</p>
      ) : savedCards.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
           {savedCards.map((student) => (
          <div key={student._id} className="border p-4 rounded shadow">
            <IDCardPreview student={student} template="template1" />
            <button
              onClick={() => handleDelete(student._id)}
              className="mt-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}

        </div>
      )}
    </div>
  );
}

export default AllCards;
