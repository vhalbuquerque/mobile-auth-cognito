import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Zocial, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ErrorModal from './components/ErrorModal';
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

const FrontPage = ({ navigation }) => {
  const [isReady, setReady] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  cleanError = () => {
    setError('');
    setShowErrorModal(false);
  }

  React.useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "cognitoHostedUI_failure":
          console.log(data.message.toString());
          setError(data.message.split('+').join(" "));
          setShowErrorModal(true);
          break;
      }
    });
    return unsubscribe;
  }, []);

  async function handleGoogleLogin() {
    cleanError();
    try {
      await Auth.federatedSignIn({
        provider: "Google",
      });
    } catch (err) {
      console.log(err)
      console.error(err);
      setError(err.message);
      setShowErrorModal(true);
    }
  };

  const handleFacebookLogin = async () => {
    cleanError();
    try {
      await Auth.federatedSignIn({
        provider: "Facebook",
      })
    } catch (err) {
      console.error(err);
      setError(err.message);
      setShowErrorModal(true);
    }
  };

  const handleAppleLogin = async () => {
  };

  if (showErrorModal) {
    return (
      <ErrorModal
        errorMessage={error}
        onClose={() => {
          setShowErrorModal(false);
          setError('');
        }} />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/icon.png')} style={styles.logo} />
          <Text style={styles.title}>Enter your account</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Sign in")}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <MaterialCommunityIcons name="email" style={{ marginTop: 0 }} size={24} color="white" />
            <Text style={{ ...styles.buttonText }}>Login with e-mail</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <MaterialCommunityIcons name="gmail" style={{ marginTop: -3 }} size={24} color="white" />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFacebookLogin}>
          <MaterialCommunityIcons name="facebook" style={{ marginTop: -4 }} size={24} color="white" />
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAppleLogin}>
          <AntDesign name="apple1" style={{ marginTop: -4 }} size={24} color="white" />
          <Text style={styles.buttonText}>Login with Apple</Text>
        </TouchableOpacity>
      </View >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#4267B2',
    width: '80%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default FrontPage;
