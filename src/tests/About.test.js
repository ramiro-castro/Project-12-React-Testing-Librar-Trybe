import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.queryByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const h2 = screen.queryByRole('heading', { name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });
  // https://stackoverflow.com/questions/65122974/getbyrole-query-for-paragraph-not-working-during-react-testing
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.queryByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const infoPokedexScreen = screen.queryByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    expect(infoPokedexScreen).toBeInTheDocument();

    const infoIIPokedexScreen = screen.queryByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(infoIIPokedexScreen).toBeInTheDocument();
  });
  // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.queryByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const pokedexImg = screen.queryByRole('img');
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImg).toHaveAttribute('alt', 'Pokédex');
  });
});
