import React, { Component } from 'react';
import {
	Animated,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import { Button, Card } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { getDeck } from '../utils/api';
import { clearNotification } from '../utils/helper';

class Quiz extends Component {
	state = {
		deck: null,
		questionCount: 0,
		correctCount: 0,
		showResults: false,
		showAnswer: false,
		progress: 0.0,
		fadeAnimation: new Animated.Value(0),
	};

	componentDidMount() {
		const { params } = this.props.navigation.state;

		clearNotification();

		getDeck(params.title).then(deck => {
			this.setState({
				deck,
			});
		});
	}

	handleCorrect() {
		const {
			deck,
			questionCount,
			correctCount,
			progress,
			showAnswer,
		} = this.state;

		this.setState({
			correctCount: correctCount + 1,
			questionCount: questionCount + 1,
			progress: progress + (1 / deck.cards.length) * 100,
			showAnswer: false,
			fadeAnimation: new Animated.Value(0),
		});

		if (showAnswer) {
			this.card.flip();
		}

		if (questionCount === deck.cards.length - 1) {
			setTimeout(() => {
				this.setState({
					showResults: true,
				});
			}, 1500);
		}
	}
	handleIncorrect() {
		const { deck, questionCount, progress, showAnswer } = this.state;

		this.setState({
			questionCount: questionCount + 1,
			progress: progress + (1 / deck.cards.length) * 100,
			showAnswer: false,
			fadeAnimation: new Animated.Value(0),
		});

		if (showAnswer) {
			this.card.flip();
		}

		if (questionCount === deck.cards.length - 1) {
			setTimeout(() => {
				this.setState({
					showResults: true,
				});
			}, 1500);
		}
	}
	handleRestart() {
		this.setState({
			questionCount: 0,
			correctCount: 0,
			progress: 0.0,
			showResults: false,
		});
	}

	render() {
		const { showResults, showAnswer, fadeAnimation } = this.state;

		Animated.timing(fadeAnimation, {
			toValue: 1,
			duration: 1000,
		}).start();

		return (
			<View style={styles.container}>
				{showResults ? this.showResult() : this.showCards()}
			</View>
		);
	}

	showResult = () => {
		const { deck, correctCount } = this.state;
		const score = Math.round((correctCount / deck.cards.length) * 100);
		const scoreText = `Score: ${score} / 100`;

		return (
			<Card
				title={scoreText}
				titleStyle={styles.scoreText}
				containerStyle={styles.scoreContainer}>
				<Button
					icon={{ name: 'update' }}
					backgroundColor="#3F51B5"
					buttonStyle={styles.correctButton}
					title="RESTART QUIZ"
					onPress={() => this.handleRestart()}
				/>
			</Card>
		);
	};

	showCards = () => {
		const {
			deck,
			questionCount,
			showQuestion,
			progress,
			fadeAnimation,
		} = this.state;
		const barWidth = Dimensions.get('screen').width - 30;
		const progressCustomStyles = {
			backgroundColor: 'red',
			borderRadius: 0,
			borderColor: 'orange',
		};

		return (
			<View style={styles.alignCenter}>
				<ProgressBarAnimated
					width={barWidth}
					value={progress}
					backgroundColorOnComplete="#6CC644"
				/>
				<View>
					<Text style={styles.hintText}>
						↓ Flip over to see the answer
					</Text>
					<CardFlip
						style={styles.cardContainer}
						ref={card => (this.card = card)}>
						<TouchableOpacity
							activeOpacity={1}
							style={[styles.card, styles.card1]}
							onPress={() => {
								this.setState({ showAnswer: true });
								this.card.flip();
							}}>
							<Animated.Text
								style={[
									styles.label,
									{ opacity: fadeAnimation },
								]}>
								{!!deck &&
									questionCount < deck.cards.length &&
									deck.cards[questionCount].question}
								{!!deck &&
									questionCount == deck.cards.length &&
									'Finish! No more quiz...'}
							</Animated.Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={1}
							style={[styles.card, styles.card2]}
							onPress={() => {
								this.setState({ showAnswer: false });
								this.card.flip();
							}}>
							<Animated.Text
								style={[
									styles.label,
									{ opacity: fadeAnimation },
								]}>
								{!!deck &&
									questionCount < deck.cards.length &&
									deck.cards[questionCount].answer}
								{!!deck &&
									questionCount == deck.cards.length &&
									'Finish! No more quiz...'}
							</Animated.Text>
						</TouchableOpacity>
					</CardFlip>
				</View>
				<Text style={styles.hintText}>
					↓ Check if your guess is correct or incorrect
				</Text>
				<Button
					icon={{ name: 'done' }}
					backgroundColor="#3F51B5"
					buttonStyle={styles.correctButton}
					title="CORRECT"
					onPress={() => this.handleCorrect()}
				/>
				<Button
					icon={{ name: 'clear' }}
					backgroundColor="#E81F63"
					buttonStyle={styles.incorrectButton}
					title="INCORRECT"
					onPress={() => this.handleIncorrect()}
				/>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 15,
	},
	alignCenter: {
		alignItems: 'center',
	},
	cardContainer: {
		width: 320,
		height: 320,
	},
	scoreContainer: {
		width: 320,
		height: 320,
		marginTop: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scoreText: {
		fontWeight: '700',
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 20,
	},
	card: {
		width: 320,
		height: 320,
		backgroundColor: '#FE474C',
		borderRadius: 5,
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.5,
	},
	card1: {
		backgroundColor: '#FE474C',
	},
	card2: {
		backgroundColor: '#FEB12C',
	},
	label: {
		textAlign: 'center',
		fontSize: 30,
		color: '#ffffff',
		backgroundColor: 'transparent',
		marginTop: 100,
		padding: 15,
	},
	hintText: {
		color: '#9e9e9e',
		fontWeight: '500',
		fontSize: 15,
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 20,
	},
	correctButton: {
		width: 200,
		borderRadius: 0,
		marginLeft: 0,
		marginRight: 0,
		marginTop: 20,
		marginBottom: 20,
	},
	incorrectButton: {
		width: 200,
		borderRadius: 0,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0,
	},
});

export default Quiz;
