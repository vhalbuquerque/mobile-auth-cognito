import React from 'react';
import { View, Image, Button, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import KeyboardAvoidingWrapper from './components/KeyboardAvoidingWrapper';
import ErrorModal from './components/ErrorModal';
import { Auth, Hub, Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);


const SignUpWithEmail = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const cleanFields = () => {
    setUsername('');
    setPassword('');
  };

  const cleanError = () => {
    setError('');
  };

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
        const user = payload.data;
        // assign user
      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
      }
    })
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  async function signUp() {
    if (!username || !password) {
      setError('Please enter your email and password');
      setShowErrorModal(true);
      cleanFields();
      return;
    }
    console.log(username, password)
    try {
      const { user } = await Auth.signUp({
        username: username.toLowerCase(),
        password: password,
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      });
      navigation.navigate('Sign in',
        {
          message:
            "Check your email box. You should click the link in the email to confirm your email address."
        });
    } catch (error) {
      console.log('error signing up:', error);
      cleanError();
      cleanFields();
      setError(error.message);
      setShowErrorModal(true);
    }
  }

  if (showErrorModal) {
    return (
      <ErrorModal errorMessage={error} onClose={() => setShowErrorModal(false)} />
    );
  }

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ flex: 1, width: '100%' }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Sign up with e-mail</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                onChangeText={(text) => setUsername(text)}
                style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input} />
            </View>
            <View style={{ marginTop: 2 }}>
              <Text>Minimum 8 characters length</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => signUp()}
            style={styles.button}>
            <Text
              style={styles.buttonText}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingWrapper >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 24,
  },
  formContainer: {
    width: '80%',
    marginBottom: 25,
  },
  inputContainer: {
    width: '100%',
    marginTop: 15,
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
    marginTop: 0,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotPassword: {
    color: '#3498db',
    marginBottom: 16,
    marginTop: 10,
  },
  createAccount: {
    color: '#3498db',
  },
});

export default SignUpWithEmail;
