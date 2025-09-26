import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RequestsConsultation from './pages/RequestsConsultation';
import NewCreditRequest from './pages/NewCreditRequest';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/requests-consultation" element={<RequestsConsultation />} />
        <Route path="/new-credit-request" element={<NewCreditRequest />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
