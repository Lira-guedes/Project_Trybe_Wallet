// Coloque aqui suas actions

// ACTIONS TYPES
export const USER_REGISTER = 'USER_REGISTER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const GET_TOTAL = 'GET_TOTAL';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

// ACTIONS CREATORS
export const userRegister = (email) => ({
  type: USER_REGISTER,
  payload: email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const getExpenses = (expenses) => ({
  type: GET_EXPENSES,
  payload: expenses,
});

export const getTotal = (total) => ({
  type: GET_TOTAL,
  payload: total,
});

export const removeExpenses = (expenseId) => ({
  type: REMOVE_EXPENSES,
  payload: expenseId,
});

export const fetchCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data).filter((elem) => elem !== 'USDT');
  return dispatch(getCurrencies(currencies));
};
