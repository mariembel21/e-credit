import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewCreditRequest from './pages/NewCreditRequest';
import RequestsConsultation from './pages/RequestsConsultation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewCreditRequest />} />
        <Route path="/consultation" element={<RequestsConsultation />} />
      </Routes>
    </Router>
  );
}

export default App;
