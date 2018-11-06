import React, { Component } from 'react';
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Button, Card, FormValidationMessage } from 'react-native-elements';

import { deleteDeck, getDeck } from '../utils/api';

class Deck extends Component {
	state = {
		deck: null,
		animation: new Animated.Value(0),
	};

	componentDidMount() {
		const { title } = this.props.navigation.state.params;
		this.initialize(title);
	}

	componentWillReceiveProps() {
		const { title } = this.props.navigation.state.params;
		this.initialize(title);
		this.setState({ animation: new Animated.Value(0) });
	}

	initialize(title) {
		getDeck(title).then(deck => {
			this.setState({
				deck,
			});
		});
	}

	addCard() {
		const { navigation } = this.props;
		const { title, updateDeck } = this.props.navigation.state.params;
		navigation.navigate('AddCard', { title, updateDeck });
	}

	startQuiz() {
		const cardCount = this.state.deck.cards.length;
		const { navigation } = this.props;
		const { title } = this.props.navigation.state.params;

		cardCount !== 0 &&
			navigation.navigate('Quiz', {
				title,
			});
	}

	async deleteItem() {
		const { navigation } = this.props;
		const { title, updateDeck } = this.props.navigation.state.params;
		await deleteDeck(title);

		await updateDeck();

		navigation.navigate('Home');
	}

	componentDidMount() {
		const { updateDeck } = this.props.navigation.state.params;

		updateDeck();
	}

	renderDeck() {
		const { deck, animation } = this.state;
		const cardCount = deck.cards.length;

		return (
			<View>
				<Card title={deck.title}>
					<Animated.Text
						style={[styles.cardCount, { fontSize: animation }]}>
						{cardCount}
					</Animated.Text>
					<Text style={styles.cardCountText}>
						{cardCount > 1 ? ' cards' : ' card'}
					</Text>
					<Button
						icon={{ name: 'add' }}
						backgroundColor="#03A9F4"
						buttonStyle={styles.addCardButton}
						title="ADD CARD"
						onPress={() => this.addCard()}
					/>
					<Button
						icon={{ name: 'done' }}
						backgroundColor="#009689"
						buttonStyle={styles.startQuizButton}
						title="START QUIZ"
						onPress={() => this.startQuiz()}
					/>
					{cardCount == 0 ? (
						<FormValidationMessage>
							{'You cannot start quiz without card decks'}
						</FormValidationMessage>
					) : (
						<FormValidationMessage />
					)}
				</Card>

				<Button
					title="Delete Deck"
					buttonStyle={styles.deleteButton}
					backgroundColor="red"
					onPress={() => this.deleteItem()}
				/>
			</View>
		);
	}
	render() {
		const { deck, animation } = this.state;

		Animated.timing(animation, {
			toValue: 50,
			duration: 1000,
		}).start();

		return deck ? this.renderDeck() : <View />;
	}
}

const styles = StyleSheet.create({
	cardCount: {
		fontWeight: '500',
		textAlign: 'center',
		marginBottom: 20,
	},
	cardCountText: {
		textAlign: 'center',
		marginBottom: 40,
	},
	addCardButton: {
		borderRadius: 0,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 20,
	},
	startQuizButton: {
		borderRadius: 0,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0,
	},
	deleteButton: {
		width: 200,
		marginTop: 50,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});

export default Deck;
