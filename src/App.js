import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ClientPage from './Pages/ClientPage';
import DashboardPage from './Pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
