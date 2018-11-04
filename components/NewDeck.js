import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	Button,
	FormLabel,
	FormInput,
	FormValidationMessage,
} from 'react-native-elements';

import { saveDeckTitle } from '../utils/api';

class NewDeck extends Component {
	state = {
		deckTitle: '',
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
				<FormLabel>Please set the title of your card deck.</FormLabel>
				<FormInput
					placeholder="Deck Title"
					value={this.state.deckTitle}
					containerStyle={{ margin: 50 }}
					onChangeText={text => this.setState({ deckTitle: text })}
				/>
				{this.state.deckTitle == '' ? (
					<FormValidationMessage>
						{'This field is required'}
					</FormValidationMessage>
				) : (
					<FormValidationMessage />
				)}
				<Button
					title="SUBMIT"
					buttonStyle={{ margin: 50 }}
					onPress={() => this.handleOnPress()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default NewDeck;
