import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    method: '',
    description: '',
    tag: '',
    currency: '',
    value: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleFetch());
  }

  handleFetch = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((elem) => elem !== 'USDT');
    return dispatch(getCurrencies(currencies));
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
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Modeda:
          <select
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
        <button
          type="submit"
          onClick={ this.handleFetch }
        >
          Adicionar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
