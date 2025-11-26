import axios from 'axios';
import API_URL from '../config/api';

// En la función handleSubmit:
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await axios.post(`${API_URL}/auth/register`, formData);
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.message || 'Error al registrarse');
  } finally {
    setLoading(false);
  }
};