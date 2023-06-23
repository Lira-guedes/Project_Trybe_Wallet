import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses, editExpenses } from '../redux/actions/index';

class Table extends Component {
  handleDelete = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(removeExpenses(expenseId));
  };

  handleEdit = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(expenseId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((elem) => (
                <tr key={ elem.id }>
                  <td>{ elem.description }</td>
                  <td>{ elem.tag }</td>
                  <td>{ elem.method }</td>
                  <td>{ Number(elem.value).toFixed(2) }</td>
                  <td>{ elem.exchangeRates[elem.currency].name }</td>
                  <td>{ Number(elem.exchangeRates[elem.currency].ask).toFixed(2) }</td>
                  <td>
                    { (elem.value * elem.exchangeRates[elem.currency].ask).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      onClick={ () => this.handleEdit(elem.id) }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => this.handleDelete(elem.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
