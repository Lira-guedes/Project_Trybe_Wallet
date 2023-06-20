import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getTotal } from '../redux/actions';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.length < 1 ? (0) : (expenses
      .reduce((acc, curr) => acc + (Number(curr.value) * curr
        .exchangeRates[curr.currency].ask), 0));
    return total;
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <div>Header</div>
        <label>
          {' '}
          E-mail:
          <p data-testid="email-field">{ email }</p>
        </label>
        <label>
          {' '}
          Total:  $
          <p data-testid="total-field">{ this.totalExpenses().toFixed(2) }</p>
        </label>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
