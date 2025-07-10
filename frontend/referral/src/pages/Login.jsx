import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [hovered, setHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://candidate-referral-management-system-m5yq.onrender.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '40px 30px',
      borderRadius: '16px',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '420px',
      transition: 'transform 0.3s ease',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '32px',
      fontSize: '30px',
      fontWeight: 700,
      color: '#222',
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border 0.3s ease, box-shadow 0.3s ease',
    },
    inputFocus: {
      border: '1px solid #a1c4fd',
      boxShadow: '0 0 0 3px rgba(161, 196, 253, 0.3)',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#6a11cb',
      backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    link: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#444',
    },
    signupSpan: {
      color: '#2575fc',
      cursor: 'pointer',
      fontWeight: 500,
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{
              ...styles.input,
              ...(focusedInput === 'email' ? styles.inputFocus : {})
            }}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{
              ...styles.input,
              ...(focusedInput === 'password' ? styles.inputFocus : {})
            }}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hovered ? styles.buttonHover : {})
            }}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
          >
            Login
          </button>
        </form>
        <p style={styles.link}>
          Don’t have an account?{' '}
          <span style={styles.signupSpan} onClick={() => navigate('/signup')}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
