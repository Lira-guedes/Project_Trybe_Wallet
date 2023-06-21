// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_REGISTER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_REGISTER:
    return ({
      ...state,
      email: action.payload,
    });
  default:
    return state;
  }
};

export default user;
