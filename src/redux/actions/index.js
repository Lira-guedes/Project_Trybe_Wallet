// Coloque aqui suas actions

// ACTIONS TYPES
export const USER_REGISTER = 'USER_REGISTER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

// ACTIONS CREATORS
export const userRegister = (email) => ({
  type: USER_REGISTER,
  payload: email,
});

export const getCurrencies = (currencies) => ({
  type: 'GET_CURRENCIES',
  currencies,
});
