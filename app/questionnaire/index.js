import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import CongratsPage from './CongratsPage';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import WelcomePage from './Welcome';

const transition = (
  <Transition.Together>
    <Transition.In type='slide-right' durationMs={200} />
    <Transition.Out type='slide-left' durationMs={200} />
  </Transition.Together>
);

const Questionnaire = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const ref = React.useRef();

  const nextQuestion = () => {
    ref.current.animateNextTransition();
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const prevQuestion = () => {
    ref.current.animateNextTransition();
    setQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const renderQuestion = () => {
    switch (questionIndex) {
      case 0:
        return <Question1 />;
      case 1:
        return <Question2 />;
      case 2:
        return <Question3 />;
      default:
        return null;
    }
  };

  const isLastQuestion = questionIndex === 2;

  const submitAnswers = () => {
    setIsSubmitted(true);
  };

  const onStartButtonPress = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return <WelcomePage onStartButtonPress={onStartButtonPress} />;
  }

  if (isSubmitted) {
    return <CongratsPage {...props} />;
  }

  return (
    <View style={styles.container}>
      <Transitioning.View
        ref={ref}
        style={styles.questionContainer}
        transition={transition}
      >
        {renderQuestion()}
      </Transitioning.View>
      <View style={styles.buttonContainer}>
        {questionIndex > 0 && (
          <TouchableOpacity style={styles.button} onPress={prevQuestion}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {!isLastQuestion && (
          <TouchableOpacity style={styles.button} onPress={nextQuestion}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {isLastQuestion && (
          <TouchableOpacity style={styles.button} onPress={() => submitAnswers()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity >
        )
        }
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
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
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'start',
    paddingTop: 5,
    width: '100%',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF4',
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default Questionnaire;
