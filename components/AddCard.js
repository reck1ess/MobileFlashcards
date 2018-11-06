import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Button, Card, FormValidationMessage } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';

import { getDeck, addCardToDeck } from '../utils/api';

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
		deck: null,
	};

	componentDidMount() {
		const { title } = this.props.navigation.state.params;

		getDeck(title).then(deck => {
			this.setState({
				deck,
			});
		});
	}

	addQuestion = question => {
		this.setState({
			question,
		});
	};

	addAnswer = answer => {
		this.setState({
			answer,
		});
	};

	handleSubmit = () => {
		const { question, answer, deck } = this.state;
		const { navigation } = this.props;
		const { title, updateDeck } = this.props.navigation.state.params;

		const card = { question, answer };
		question.length !== 0 &&
			answer.length !== 0 &&
			addCardToDeck(deck.title, card).then(() => {
				this.setState({
					question: '',
					answer: '',
				});

				updateDeck();

				navigation.navigate('Deck', {
					title,
				});
			});
	};

	renderAddCard() {
		return (
			<Card>
				<View>
					<Text style={styles.text}>Question</Text>
				</View>
				<View style={styles.textInputContainer}>
					<TextInput
						onChangeText={this.addQuestion}
						placeholder="Please enter your question"
						value={this.state.question}
						style={styles.textInput}
					/>
				</View>
				{this.state.question == '' ? (
					<FormValidationMessage>
						{'You cannot add card without question'}
					</FormValidationMessage>
				) : (
					<FormValidationMessage />
				)}
				<View>
					<Text style={styles.text}>Answer</Text>
				</View>
				<View style={styles.textInputContainer}>
					<TextInput
						onChangeText={this.addAnswer}
						placeholder="Please enter your answer"
						value={this.state.answer}
						style={styles.textInput}
					/>
				</View>
				{this.state.answer == '' ? (
					<FormValidationMessage>
						{'You cannot add card without answer'}
					</FormValidationMessage>
				) : (
					<FormValidationMessage />
				)}
				<Button
					icon={{ name: 'done' }}
					backgroundColor="#03A9F4"
					buttonStyle={styles.button}
					title="SUBMIT"
					onPress={() => this.handleSubmit()}
				/>
			</Card>
		);
	}

	render() {
		const { deck } = this.state;

		return deck ? this.renderAddCard() : <View />;
	}
}

const styles = StyleSheet.create({
	text: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 40,
		fontWeight: '100',
		fontSize: 40,
	},
	textInputContainer: {
		borderColor: '#949494',
		borderRadius: 5,
		margin: 20,
		marginBottom: 0,
		padding: 5,
		flexDirection: 'row',
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#949494',
		padding: 10,
		flex: 1,
	},
	button: {
		margin: 50,
	},
});

export default AddCard;
