import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// mport FavoritePokemons, { favoritePokemons } from '../pages/FavoritePokemons';
// import {
//   readFavoritePokemonIds,
// } from './services/pokedexService';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.queryByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const noFavorite = screen.queryByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('Testa se são exibidos todos os cards de pokémons favoritados', () => {
    // renderWithRouter(<FavoritePokemons />);

    // const list = screen.getByRole('list', {
    //   name: /Favorite pokémons/i,
    // });
    // const { getAllByRole } = within(list);
    // const items = getAllByRole('listitem');
    // expect(items).toBeInTheDocument();
    // beforeEach(() => {
    //   localStorage.setItem('favoritePokemonIds', JSON.stringify([]));
    // });

    // afterEach(() => localStorage.clear());

    // const favoritePokemons = [
    //   {
    //     id: 25,
    //     name: 'Pikachu',
    //     type: 'Electric',
    //     averageWeight: {
    //       value: '6.0',
    //       measurementUnit: 'kg',
    //     },
    //     image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    //     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    //     foundAt: [
    //       {
    //         location: 'Kanto Viridian Forest',
    //         map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    //       },
    //       {
    //         location: 'Kanto Power Plant',
    //         map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    //       },
    //     ],
    //     summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    //   },
    //   {
    //     id: 4,
    //     name: 'Charmander',
    //     type: 'Fire',
    //     averageWeight: {
    //       value: '8.5',
    //       measurementUnit: 'kg',
    //     },
    //     image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    //     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    //     foundAt: [
    //       {
    //         location: 'Alola Route 3',
    //         map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    //       },
    //       {
    //         location: 'Kanto Route 3',
    //         map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    //       },
    //       {
    //         location: 'Kanto Route 4',
    //         map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    //       },
    //       {
    //         location: 'Kanto Rock Tunnel',
    //         map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    //       },
    //     ],
    //     summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
    //   },
    // ];
    // inspirado nos testes do Trybetunes
    const favoritePokemons = [25, 4];

    localStorage.setItem('favoritePokemonIds', JSON.stringify(favoritePokemons));

    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.queryByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
