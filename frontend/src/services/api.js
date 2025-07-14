export const submitCreditRequest = async (data) => {
  try {
    const response = await fetch('/api/credit-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting credit request:', error);
    throw error;
  }
};

export const getClientInfoByCIN = async (cin) => {
  return {
    lastName: "Belghouthi",
    firstName: "Mariem",
    birthDate: "2003-03-21",
    familyStatus: "Célibataire",
    accounts: [
      { number: "123456789" },
      { number: "987654321" }
    ]
  };
};

export const getAccountDetails = async (accountNumber) => {
  const details = {
    "123456789": { currency: "TND", openingDate: "2020-01-01" },
    "987654321": { currency: "EUR", openingDate: "2019-06-12" }
  };
  return details[accountNumber] || { currency: "", openingDate: "" };
};
