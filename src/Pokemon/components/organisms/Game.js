import React, { PureComponent } from 'react';
import pokemonData from '../../../data/pokemon.json';

class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      habitat: '',
      currentPokemon: [],
      inventory: {},
      loaded: false
    };
  }

  componentDidMount() {
    this.loadgame();
    this.setState({ loaded: true });
  }

  changeHabitat = habitat => {
    this.setState({ habitat });
  };

  modifyItems = (item, quantity = 1) => {
    // Item = string means used an item, object means add an item
    let inventory = { ...this.state.inventory };
    if (typeof item === 'string') {
      inventory[item].quantity - quantity <= 0
        ? delete inventory[item]
        : (inventory[item].quantity -= quantity);
    } else {
      let addedItem = inventory[item.name];
      if (!addedItem) addedItem = { ...item, quantity: 0 };
      addedItem.quantity += quantity;
    }
    this.setState({ inventory });
  };

  modifyPokemon = pokemon => {
    // Object means adding pokemon, string/number means removing
    if (typeof pokemon === 'object') {
      this.setState(prevSt => {
        return { currentPokemon: [...prevSt.currentPokemon, pokemon] };
      });
    } else {
      this.setState(prevSt => {
        return {
          currentPokemon: prevSt.currentPokemon.filter(p => p.id !== pokemon)
        };
      });
    }
  };

  changeGameState = type => {
    if (type === 'load') {
      let currentPokemon = localStorage.getItem('currentPokemon') || [];
      let inventory = localStorage.getItem('inventory') || {};
      this.setState({ currentPokemon, inventory });
    } else {
      localStorage.setItem('currentPokemon', this.state.currentPokemon);
      localStorage.setItem('inventory', this.state.inventory);
    }
  };

  render() {
    return <div className="Game" />;
  }
}

Game.defaultProps = {};

Game.propTypes = {};

export default Game;