import React from 'react';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
