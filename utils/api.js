import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'flashcard:deck';

export function addCardToDeck(title, card) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(data => JSON.parse(data))
		.then(decks => {
			decks[title].cards.push(card);

			AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
		});
}

export function saveDeckTitle(title) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(JSON.parse)
		.then(decks => {
			if (!decks) decks = {};
			decks[title] = { title, cards: [] };
			return AsyncStorage.setItem(
				DECK_STORAGE_KEY,
				JSON.stringify(decks)
			);
		});
}

export function getDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data =>
		JSON.parse(data)
	);
}

export function getDeck(title) {
	return getDecks().then(decks => decks[title]);
}
