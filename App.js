import React, { Component } from 'react';
import { getDecks } from './utils/api';
import { setNotification } from './utils/helper';
import MainNavigator from './components/Navigator';

class App extends Component {
	state = {
		decks: null,
	};

	componentDidMount() {
		setNotification();
		this.updateDeck();
	}

	updateDeck() {
		getDecks().then(decks => {
			this.setState({ decks });
		});
	}

	render() {
		return (
			<MainNavigator
				screenProps={{
					decks: this.state.decks,
					updateDeck: () => this.updateDeck(),
				}}
			/>
		);
	}
}

export default App;
