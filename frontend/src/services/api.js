import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 1. Submit new credit request
const submitCreditRequest = async (data) => {
  console.log("Submitting data:", JSON.stringify(data, null, 2));


  const response = await axiosInstance.post('/requests', data);
  return response.data;
};

// 2. Get client info by CIN
const getClientInfoByCIN = async (cin) => {
  const response = await axiosInstance.get(`/clients/${cin}`);
  return response.data;
};

const getAccountDetails = async (accountNumber) => {
  try {
    const response = await fetch(`http://localhost:3000/accounts/${accountNumber}`);
    if (!response.ok) throw new Error('Account not found');
    const data = await response.json();
    return {
      currency: data.currency,
      openingDate: data.openingDate,
    };
  } catch (error) {
    console.error('Failed to fetch account details:', error);
    return null;
  }
};

// 4. Get all credit requests 
const getAllCreditRequests = async () => {
  const response = await axiosInstance.get('/requests');
  return response.data;
};

// 5. Update credit request status
const updateCreditRequestStatus = async (id, decision) => {
  const response = await axiosInstance.patch(`/requests/id/${id}/decision`, { decision });
  return response.data;
};

// Default export 
const api = {
  submitCreditRequest,
  getClientInfoByCIN,
  getAccountDetails,
  getAllCreditRequests,
  updateCreditRequestStatus,
};

export default api;
export {
  submitCreditRequest,
  getClientInfoByCIN,
  getAccountDetails,
  getAllCreditRequests,
  updateCreditRequestStatus,
};
