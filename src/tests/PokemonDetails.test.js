import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const moreDetails = 'More details';
  it('Testa se as informações detalhadas do pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const botaoElectric = screen.queryByRole('button', { name: 'Electric' });

    userEvent.click(botaoElectric); // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado

    const linkMoreDetails = screen.queryByRole('link', { name: moreDetails });

    userEvent.click(linkMoreDetails);
    expect(linkMoreDetails).not.toBeInTheDocument(moreDetails);

    const h2 = screen.queryByRole('heading', { name: 'Pikachu Details' });
    expect(h2).toBeInTheDocument();

    const h2Summary = screen.queryByRole('heading', { name: 'Summary' });
    expect(h2Summary).toBeInTheDocument();

    const paragraph = screen.queryByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(paragraph).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas contendo as localizações do pokémon:', () => {
    renderWithRouter(<App />);
    const botaoElectric = screen.queryByRole('button', { name: 'Electric' });

    userEvent.click(botaoElectric); // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado

    const linkMoreDetails = screen.queryByRole('link', { name: moreDetails });

    userEvent.click(linkMoreDetails);
    expect(linkMoreDetails).not.toBeInTheDocument(moreDetails);

    const h2GameLocations = screen.queryByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(h2GameLocations).toBeInTheDocument();

    const paragraphI = screen.queryByText('Kanto Viridian Forest');
    expect(paragraphI).toBeInTheDocument();

    const paragraphII = screen.queryByText('Kanto Power Plant');
    expect(paragraphII).toBeInTheDocument();

    const mapImg1 = screen.queryAllByRole('img');
    expect(mapImg1[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImg1[1]).toHaveAttribute('alt', 'Pikachu location');

    expect(mapImg1[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapImg1[2]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const botaoElectric = screen.queryByRole('button', { name: 'Electric' });

    userEvent.click(botaoElectric); // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado

    const linkMoreDetails = screen.queryByRole('link', { name: moreDetails });

    userEvent.click(linkMoreDetails);
    expect(linkMoreDetails).not.toBeInTheDocument(moreDetails);

    const checkBox = screen.queryByText('Pokémon favoritado?', { selector: 'label' });
    console.log(checkBox);
    // const hrfAttribute = linkMoreDetails.getAttribute('href');
    expect(checkBox).toBeInTheDocument();
  });
});
