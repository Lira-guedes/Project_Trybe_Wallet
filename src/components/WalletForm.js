import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchAddExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    method: 'Dinheiro',
    description: '',
    tag: 'Lazer',
    currency: 'USD',
    value: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(fetchAddExpenses(this.state));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      method: 'Dinheiro',
      description: '',
      tag: 'Lazer',
      currency: 'USD',
      value: '',
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, method, description, currency, tag } = this.state;
    const { currencies } = this.props;

    return (
      <div>
        <label>
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Modeda:
          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((elem) => (
              <option key={ elem }>{ elem }</option>
            ))}
          </select>
        </label>
        <label>
          Forma de Pagamento:
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria:
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit" onClick={ this.handleSubmit }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  total: state.wallet.total,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
