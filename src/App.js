import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/page'; 
import ProtectedRoute from './ProtectedRoutes';
import HomePage from './pages/Home/page';
import Navbar from './common/Navbar';
import BlogPage from './pages/Blog/blog-page';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
