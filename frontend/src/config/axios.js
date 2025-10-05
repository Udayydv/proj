import axios from 'axios';

// ✅ Local = localhost:5000, Production = same domain
const baseURL =
  import.meta.env.MODE === 'production'
    ? '/api'
    : 'http://localhost:5000/api';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default axios;
