import React, { Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem } from 'react-native-elements';

class DeckList extends Component {
	handleOnPress(key) {
		const { navigation } = this.props;
		const { updateDeck } = this.props.screenProps;

		navigation.navigate('Deck', {
			title: key,
			updateDeck: updateDeck,
		});
	}
	renderDeck = ({ item }) => {
		const { decks } = this.props.screenProps;
		const key = item;
		const cardCount = decks[key].cards.length;
		const deckTitle = decks[key].title;
		const deckSize =
			cardCount > 1 ? cardCount + ' cards' : cardCount + ' card';

		return (
			<ListItem
				title={deckTitle}
				subtitle={deckSize}
				containerStyle={styles.deck}
				onPress={() => this.handleOnPress(key)}
			/>
		);
	};
	render() {
		const { decks } = this.props.screenProps;

		return decks ? (
			<List>
				<FlatList
					data={Object.keys(decks)}
					renderItem={this.renderDeck}
					keyExtractor={(item, index) => index.toString()}
				/>
			</List>
		) : null;
	}
}

const styles = StyleSheet.create({
	deck: {
		height: 100,
		paddingTop: 25,
		paddingBottom: 25,
		paddingLeft: 25,
		paddingRight: 25,
	},
});

export default DeckList;
