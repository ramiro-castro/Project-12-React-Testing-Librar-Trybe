import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina/que-nao-existe/');
    });
    const notFound = screen.queryByRole('heading', { name: 'Page requested not found' });

    expect(notFound).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina/que-nao-existe/');
    });

    const notFoundImg = screen.queryByRole('img');
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImg).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
