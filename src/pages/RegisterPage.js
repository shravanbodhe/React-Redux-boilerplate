import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/authApi';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(formData);

    if (response.data) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br />
        <br />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <br />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </form>

      <br />
      <Link to="/login">
        <button type="button">Go to Login</button>
      </Link>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
}

export default RegisterPage;
