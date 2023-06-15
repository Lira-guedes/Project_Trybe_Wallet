// Coloque aqui suas actions

// ACTIONS TYPES
export const USER_REGISTER = 'USER_REGISTER';

// ACTIONS CREATORS
export const userRegister = (email) => ({
  type: USER_REGISTER,
  payload: email,
});
