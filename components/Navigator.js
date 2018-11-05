import {
	createBottomTabNavigator,
	createStackNavigator,
} from 'react-navigation';

import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Deck from './Deck';
import AddCard from './AddCard';
import Quiz from './Quiz';

const TabNav = createBottomTabNavigator(
	{
		Decks: {
			screen: DeckList,
		},
		'New Deck': {
			screen: NewDeck,
		},
	},
	{
		tabBarOptions: {
			activeTintColor: 'white',
			labelStyle: {
				fontSize: 16,
			},
			style: {
				backgroundColor: '#3F51B5',
			},
		},
	}
);

const MainNavigator = createStackNavigator({
	Home: {
		screen: TabNav,
		navigationOptions: {
			headerTintColor: 'white',
			headerLeftTintColor: 'white',
			title: 'Home',
			headerStyle: {
				backgroundColor: '#3F51B5',
			},
		},
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: {
			headerTintColor: 'white',
			headerLeftTintColor: 'white',
			title: 'Add Card',
			headerStyle: {
				backgroundColor: '#03A9F4',
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
				backgroundColor: '#3F51B5',
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
				backgroundColor: '#009689',
			},
		},
	},
});

export default MainNavigator;
