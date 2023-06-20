import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <div>Table</div>
        <header>
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
        </header>
        <tbody>
          {
            expenses.map((elem) => (
              <tr key={ elem.id }>
                <td>{ elem.description }</td>
                <td>{ elem.tag }</td>
                <td>{ elem.method }</td>
                <td>{ elem.value }</td>
                <td>{ elem.exchangeRates[elem.currency].name }</td>
                <td>{ elem.exchangeRates[elem.currency].ask }</td>
                <td>{ elem.value * elem.exchangeRates[elem.currency].ask }</td>
                <td>Real</td>
              </tr>
            ))
          }
        </tbody>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Table);
