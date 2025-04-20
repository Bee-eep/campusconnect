import { Routes, Route } from 'react-router-dom';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthContainer />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<AuthContainer />} />
    </Routes>
  );
}

export default App;