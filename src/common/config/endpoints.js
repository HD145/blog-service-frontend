const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const endpoint = (pathSegments = []) => {
  return `${API_BASE_URL}/${pathSegments.join('/')}`;
};

export default endpoint;
