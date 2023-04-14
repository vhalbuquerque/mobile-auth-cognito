import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import KeyboardAvoidingWrapper from './components/KeyboardAvoidingWrapper';
import { Auth, Hub, Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import ErrorModal from './components/ErrorModal';
import MessageModal from './components/MessageModal'
Amplify.configure(awsconfig);


const PasswordRecovery = ({ navigation }) => {
  const [message, setMessage] = React.useState('');
  const [showMessageModal, setShowMessageModal] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const cleanFields = () => {
    setNewPassword('');
    setCode('');
  };
  const forgotPasswordHandler = (username) => {
    if (username === '') {
      setError('Please enter your email');
      setShowErrorModal(true);
      return;
    }
    // Send confirmation code to user's email
    Auth.forgotPassword(username)
      .then((data) => {
        console.log(data);
        setUsername(username);
        setStep(2);
        setMessage('Confirmation code sent to your email');
        setShowMessageModal(true);
      })
      .catch(
        (err) => {
          console.log(err);
          setError(err.message);
          setShowErrorModal(true);
          setUsername('');
        });
  }

  const forgotPasswordSubmitHandler = (username, code, newPassword) => {
    if (username === '' || code === '' || newPassword === '') {
      setError('Please enter your email, confirmation code and new password');
      setShowErrorModal(true);
      return;
    }

    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then((data) => {
        console.log(data);
        navigation.navigate("SignIn", { message: 'Password changed successfully' });
        cleanFields();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setShowErrorModal(true);
        cleanFields();
      });
  }
  if (showErrorModal) {
    return (
      <ErrorModal errorMessage={error} onClose={() => setShowErrorModal(false)} />
    );
  }

  if (showMessageModal) {
    return <MessageModal message={message} onClose={() => {
      setShowMessageModal(false);
    }} />
  }

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Password Recovery</Text>
            {step === 2 && <Text>Recovering account: {username}</Text>}
          </View>
          <View style={styles.formContainer}>
            {step === 1 && < View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                onChangeText={
                  (text) => setUsername(text.toLowerCase())
                }
                style={styles.input} />
            </View>
            }
            {step == 2 && <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmation Code</Text>
                <TextInput
                  onChangeText={
                    (text) => setCode(text)
                  }
                  style={styles.input} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  onChangeText={
                    (text) => setNewPassword(text)
                  }
                  secureTextEntry
                  style={styles.input} />
              </View>
            </>}
          </View>
          {step === 1 && < TouchableOpacity style={styles.button} onPress={() => forgotPasswordHandler(username)}>
            <Text
              style={styles.buttonText}>
              Send Code
            </Text>
          </TouchableOpacity>}
          {step === 2 && <>
            <TouchableOpacity style={styles.forgotPassword} onPress={() => forgotPasswordHandler(username)}>
              <View>
                <Text>
                  Don't forget to check your SPAM for the confirmation code! If not found,
                  <Text
                    style={styles.forgotPassword}>
                    &nbsp;resend code
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => forgotPasswordSubmitHandler(username, code, newPassword)}>
              <Text
                style={styles.buttonText}>
                Create new password
              </Text>
            </TouchableOpacity>
          </>}
        </View>
      </View>
    </KeyboardAvoidingWrapper >
  );
};

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
    marginBottom: 8,
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
    width: "80%"
  },
  createAccount: {
    color: '#3498db',
  },
});

export default PasswordRecovery;
