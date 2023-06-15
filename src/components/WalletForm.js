import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    method: 'Dinheiro',
    description: '',
    tag: '',
    currency: 'USD',
    value: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleFetch());
  }

  handleFetch = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
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
            name="value"
            type="number"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label>
          <input
            name="description"
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
            name="currency"
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
          Categoria
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
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
