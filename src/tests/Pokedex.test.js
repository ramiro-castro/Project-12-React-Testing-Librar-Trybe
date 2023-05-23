import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.queryByRole('heading', { name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    const proximoPokemon = screen.queryByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(proximoPokemon);
    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
  });
  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const arrayExpectTextButton = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const indexarBotoesFiltro = screen.queryAllByTestId('pokemon-type-button');
    expect(indexarBotoesFiltro).toHaveLength(7);
    indexarBotoesFiltro.forEach((element, index) => {
      // console.log(element.innerHTML);
      expect(element.innerHTML).toMatch(arrayExpectTextButton[index]);
    });
    // console.log(indexarBotoesFiltro[0].innerHTML);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    // https://github.com/testing-library/jest-dom/issues/338
    renderWithRouter(<App />);
    const botaoAll = screen.queryByRole('button', { name: 'All' });
    expect(botaoAll).toBeVisible(); // O botão All precisa estar sempre visível.

    expect(botaoAll).not.toHaveAttribute(
      'data-testid',
      'pokemon-type-button',
    );// Os botões de filtragem por tipo possuem o data-testid=pokemon-type-button exceto o botão All

    expect(botaoAll).not.toHaveAttribute('disabled'); // O botão All precisa estar sempre visível.
    userEvent.click(botaoAll); // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    // https://stackoverflow.com/questions/55712640/jest-testing-window-location-reload
    window.location.reload(); // Ao carregar a página, o filtro selecionado deverá ser All.
    expect(firstPokemon).toBeInTheDocument();
  });
});
