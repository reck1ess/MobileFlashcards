import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const DeckList = props => {
	const renderDeck = item => {
		return (
			<View>
				<TouchableOpacity>
					<View>
						<Text>Card's Name</Text>
					</View>
					<View>
						<Text>Number of Questions</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View>
			<FlatList data={['Hello', 'World']} renderItem={renderDeck} />
		</View>
	);
};

export default DeckList;
