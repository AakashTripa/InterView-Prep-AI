import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePicSelector from '../../components/Inputs/ProfilePicSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';

// Optional: Add fallback validator if needed
const validatePassword = (password) => password.length >= 8;

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {updateUser}=useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = '';

    if (!fullName) {
      setError('Full name is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    setError('');
    try {
     if (profilePic) {
        const imageUploadRes=await uploadImage(profilePic);
        profileImageUrl=imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
       name: fullName,
        email,
        password,
        profileImageUrl
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again');
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Create an account</h3>
      <p className="text-sm text-gray-600 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        <ProfilePicSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          type="text"
          placeholder="John Doe"
        />

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          type="text"
          placeholder="john@example.com"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className="text-sm text-red-500 -mt-3">{error}</p>}

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition cursor-pointer"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-700 text-center mt-3">
          Already have an account?{' '}
          <span
            className="text-orange-500 hover:underline cursor-pointer"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
