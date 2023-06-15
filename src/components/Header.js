import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
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
          Total:
          <p data-testid="total-field">0</p>
        </label>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
