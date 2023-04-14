import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MenuBar } from './components/MenuBar';

const Home = ({ navigation }) => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Complete now your Questionnaire</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Help us to know you better.
          </Text>
        </View>
      </View>
      <MenuBar navigation={navigation} activeMenuItem={'home'} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF4',
    paddingHorizontal: 20,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  menuLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default Home;
