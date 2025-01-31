import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/page';
import ProtectedRoute from './ProtectedRoutes';
import HomePage from './pages/Home/page';
import Navbar from './common/Navbar';
import BlogPage from './pages/Blog/blog-page';
import RegisterPage from './pages/Register/page';
import ProfilePage from './pages/Profile/page';
import ExplorePage from './pages/Explore/page';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
