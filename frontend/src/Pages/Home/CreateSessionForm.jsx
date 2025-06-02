import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ✅ Handle form input changes
  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // ✅ Handle form submission
  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    // Add your API call here
    console.log("Creating session with data:", formData);
  };

  return (
    <div className=''>
      <h3 className=''>
        Start a New Interview Journey
      </h3>
      <p className=''>
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>
      <form onSubmit={handleCreateSession} className=''>
        <Input
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          label="Target Role"
          placeholder="(e.g. Frontend Developer, UI/UX Designer, etc.)"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          label="Years of Experience"
          placeholder="(e.g. 1 year, 3 years, 5+ years)"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={(e) => handleChange("topicsToFocus", e.target.value)}
          label="Topics To Focus On"
          placeholder="(Comma separated, e.g. React, Node.js, MySQL)"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          label="Description"
          placeholder="(Any specific goals or notes for this session)"
          type="text"
        />

        {error && <p className='text-red-500'>{error}</p>}

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
