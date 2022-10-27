import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const botaoElectric = screen.queryByRole('button', { name: 'Electric' });

    userEvent.click(botaoElectric); // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado
    const linkMoreDetails = screen.queryByRole('link', { name: 'More details' });

    userEvent.click(linkMoreDetails);
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();

    const typePokemon = screen.getByText('Electric');
    expect(typePokemon).toBeInTheDocument();

    const weightPokemon = screen.getByText('Average weight: 6.0 kg');
    expect(weightPokemon).toBeInTheDocument();

    const pokemonImg = screen.queryAllByRole('img');
    expect(pokemonImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg[0]).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Testa se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido', () => {
    renderWithRouter(<App />);
    const botaoElectric = screen.queryByRole('button', { name: 'Electric' });

    userEvent.click(botaoElectric);
    const linkMoreDetails = screen.queryByRole('link', { name: 'More details' });
    const hrfAttribute = linkMoreDetails.getAttribute('href');
    // console.log(hrfAttribute);
    expect(hrfAttribute).toBe('/pokemons/25');
  });

  it('Testa se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    renderWithRouter(<App />);
    const botaoElectric = screen.queryByRole('button', { name: 'Electric' });

    userEvent.click(botaoElectric); // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado
    const linkMoreDetails = screen.queryByRole('link', { name: 'More details' });

    userEvent.click(linkMoreDetails);
    const h2 = screen.queryByRole('heading', { name: 'Pikachu Details' });

    expect(h2).toBeInTheDocument();
  });

  it('Testa também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const botaoElectric = screen.queryByRole('button', { name: 'Electric' });

    userEvent.click(botaoElectric); // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado
    const linkMoreDetails = screen.queryByRole('link', { name: 'More details' });

    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const favoritePokemons = [25];

    localStorage.setItem('favoritePokemonIds', JSON.stringify(favoritePokemons));

    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.queryByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    const pokemonImg = screen.queryAllByRole('img');
    expect(pokemonImg[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonImg[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
