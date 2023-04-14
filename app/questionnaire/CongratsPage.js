import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CongratsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Congratulations!</Text>
      <Text style={styles.text}>
        You have successfully completed the questionnaire.
      </Text>
      <Text style={styles.text}>
        Thank you for taking the time to answer these questions.
      </Text>
      <TouchableOpacity onPress={() => navigation.popToTop()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Close</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CongratsPage;
