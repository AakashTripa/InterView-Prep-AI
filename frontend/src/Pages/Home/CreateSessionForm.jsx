import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

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

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setLoading(true);
    
    try {const aiResponse=await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
      role,
      experience,
      topicsToFocus,
      numberOfQuestions: 10,
    });
const generatedQuestions=aiResponse.data;

    const response=await axiosInstance.post(API_PATHS.SESSION.CREATE,{
      ...formData,
      questions: generatedQuestions,
    });
    if(response.data?.session?._id){
      navigate(`/interview-prep/${response.data?.session?._id}`);
    }
    } catch (err) {
      if(err.response&& err.response.data.message){
        setError(err.response.data.message);
      }else{
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 shadow-md">
    <h3 className="text-xl font-bold text-gray-900 text-center">
      🎯 Start a New Interview Journey
    </h3>
    <p className="text-sm text-gray-600 text-center mt-1 mb-4">
      Fill out a few quick details and unlock your personalized set of interview questions!
    </p>

    <form onSubmit={handleCreateSession} className="space-y-4">
      <Input
        value={formData.role}
        onChange={(e) => handleChange("role", e.target.value)}
        label="Target Role"
        placeholder="e.g. Frontend Developer, UI/UX Designer"
        type="text"
      />

      <Input
        value={formData.experience}
        onChange={(e) => handleChange("experience", e.target.value)}
        label="Years of Experience"
        placeholder="e.g. 1, 3, 5"
        type="number"
      />

      <Input
        value={formData.topicsToFocus}
        onChange={(e) => handleChange("topicsToFocus", e.target.value)}
        label="Topics to Focus"
        placeholder="React, Node.js, MySQL"
        type="text"
      />

      <Input
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        label="Description"
        placeholder="Any specific goals for this session"
        type="text"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${
          isLoading
            ? 'bg-indigo-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isLoading && <SpinnerLoader />}Create Session
      </button>
    </form>
  </div>
);
};

export default CreateSessionForm;
