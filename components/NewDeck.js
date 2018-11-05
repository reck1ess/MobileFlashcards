import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Button, Card, FormValidationMessage } from 'react-native-elements';

import { saveDeckTitle } from '../utils/api';

class NewDeck extends Component {
	state = {
		deckTitle: '',
	};

	handleOnChange = deckTitle => {
		this.setState({
			deckTitle,
		});
	};

	handleOnPress = () => {
		const { deckTitle } = this.state;
		const { navigation } = this.props;
		const { updateDeck } = this.props.screenProps;

		deckTitle.length !== 0 &&
			saveDeckTitle(deckTitle).then(() => {
				updateDeck();

				navigation.navigate('Deck', {
					title: deckTitle,
					updateDeck,
				});

				this.setState({
					deckTitle: '',
				});
			});
	};
	render() {
		return (
			<View style={styles.container}>
				<Card>
					<View>
						<Text style={styles.text}>Deck Title</Text>
					</View>
					<View style={styles.textInputContainer}>
						<TextInput
							onChangeText={this.handleOnChange}
							placeholder="Please enter deck title"
							value={this.state.deckTitle}
							style={styles.textInput}
						/>
					</View>
					{this.state.deckTitle == '' ? (
						<FormValidationMessage>
							{'This field is required'}
						</FormValidationMessage>
					) : (
						<FormValidationMessage />
					)}
					<Button
						icon={{ name: 'done' }}
						backgroundColor="#03A9F4"
						buttonStyle={styles.button}
						title="SUBMIT"
						onPress={() => this.handleOnPress()}
					/>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	text: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 20,
		marginBottom: 20,
		fontWeight: '100',
		fontSize: 40,
	},
	textInputContainer: {
		borderColor: '#949494',
		borderRadius: 5,
		margin: 10,
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

export default NewDeck;
