import {
	createBottomTabNavigator,
	createStackNavigator,
} from 'react-navigation';

import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Deck from './Deck';
import AddCard from './AddCard';
import Quiz from './Quiz';

const TabNav = createBottomTabNavigator({
	Decks: {
		screen: DeckList,
	},
	'New Deck': {
		screen: NewDeck,
	},
});

const MainNavigator = createStackNavigator({
	Home: {
		screen: TabNav,
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: {
			headerTintColor: 'white',
			headerLeftTintColor: 'white',
			title: 'Add Card',
			headerStyle: {
				backgroundColor: 'blue',
			},
		},
	},
	Deck: {
		screen: Deck,
		navigationOptions: {
			headerTintColor: 'white',
			headerLeftTintColor: 'white',
			title: 'Deck',
			headerStyle: {
				backgroundColor: 'blue',
			},
		},
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			headerTintColor: 'white',
			headerLeftTintColor: 'white',
			title: 'Quiz',
			headerStyle: {
				backgroundColor: 'blue',
			},
		},
	},
});

export default MainNavigator;
