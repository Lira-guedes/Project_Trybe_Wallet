import { screen, act, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const valueInput = 'value-input';
describe('', () => {
  it('Testa se é renderizado os inputs da página de Login:', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
  it('Testa se é renderizado os inputs do componente WalletForm da página da Carteira:', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    expect(screen.getByTestId(valueInput)).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
  });
  it('Testa se há o botão Entrar, se ele redireciona para a página /carteira, e se é habilitado e desabilitado corretamente:', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    userEvent.type((screen.getByTestId('email-input')), 'lira@lira.com.br');
    userEvent.type((screen.getByTestId('password-input')), 'lira12345');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
  it('Testa se é renderizado os fields do componente Header da página da Carteira:', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    expect(screen.getByTestId('email-field')).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
  });
  it('Testa se o valor do value-input confere:', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    act(() => { userEvent.type((screen.getByTestId(valueInput)), '123456'); });
    expect((screen.getByTestId(valueInput)).value).toBe('123456');
  });
  it('Testa os valores das options selecionadas nas tags Select do WalletForm:', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    await waitFor(() => { expect(screen.getByLabelText('Moeda:')).toHaveTextContent('USD'); });
    act(() => {
      userEvent.selectOptions((screen.getByLabelText('Método de pagamento:')), 'Cartão de crédito');
      userEvent.selectOptions((screen.getByLabelText('Categoria:')), 'Saúde');
      userEvent.selectOptions((screen.getByLabelText('Moeda:')), 'CHF');
    });
    expect(screen.getByRole('option', { name: 'Cartão de crédito' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Saúde' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'CHF' }).selected).toBe(true);
  });
  it('Testa se os estados da WalletForm retornam ao seu valor inicial ao clicar no botão Adicionar Despesa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    expect(screen.getByTestId('description-input')).toBe('');
    expect(screen.getByTestId('currency-input')).toBe('USD');
    expect(screen.getByTestId('tag-input')).toBe('Lazer');
    expect(screen.getByTestId('method-input')).toBe('Dinheiro');
    expect(screen.getByTestId(valueInput)).toBe('');
  });
});
