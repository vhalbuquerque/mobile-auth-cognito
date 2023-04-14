import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WelcomePage = ({ onStartButtonPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to our Questionnaire!</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          This questionnaire will help us get to know you better.
        </Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={onStartButtonPress}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 40,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomePage;
