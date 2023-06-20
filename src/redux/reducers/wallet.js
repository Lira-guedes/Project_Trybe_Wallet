// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_EXPENSES, GET_TOTAL, GET_CURRENCIES, REMOVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    total: 0,
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case GET_TOTAL:
    return {
      ...state,
      total: action.payload,
    };
  case REMOVE_EXPENSES: return {
    ...state,
    expenseId: [...state.expenseId.filter((elem) => elem.id !== payload)],
  };
  default:
    return state;
  }
};

export default walletReducer;
