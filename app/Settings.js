import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { MenuBar } from './components/MenuBar';

const ProfilePage = ({ navigation }) => {
  const [loggedUser, setLoggedUser] = React.useState(null);
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(currentUser => {
        setLoggedUser(currentUser);
      })
      .catch(() => console.log("Not signed in"));
  }, []);

  return (
    <>
      <View style={styles.container}>
        {loggedUser &&
          <View style={styles.contentContainer}>
            <Text style={styles.label}>User</Text>
            <Text style={styles.usernameText}>{loggedUser["attributes"].email}</Text>
          </View>}
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <MenuBar navigation={navigation} activeMenuItem={'settings'} />
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
  },
  usernameText: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  signOutButtonText: {
    color: '#FFF',
    fontSize: 20,
  },
  contentContainer: {
    width: '80%',
    marginTop: 15,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: 500,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: 18,
  },
});

export default ProfilePage;
