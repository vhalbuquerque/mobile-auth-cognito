import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './app/index';
import Questionnaire from './app/questionnaire/index';
import SignIn from './app/SignIn';
import SignUp from './app/SignUp';
import { Text } from 'react-native';
import { Auth, Hub, Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Home from './app/Home';
import Settings from './app/Settings';
import ErrorModal from './app/components/ErrorModal';
import PasswordRecovery from './app/PasswordRecovery';
Amplify.configure(awsconfig);


const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [customState, setCustomState] = React.useState(null);
  const [error, setError] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setLoggedUser(data);
          break;
        case "signOut":
          setLoggedUser(null);
          break;
        case "autoSignIn":
          setLoggedUser(data);
          break;
        case "autoSignIn_failure":
          console.log(data);
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setLoggedUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {!loggedUser ?
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Sign in" component={SignIn} options={{ title: 'Sign in with e-mail' }} />
            <Stack.Screen name="Sign up" component={SignUp} options={{ title: 'Sign up with e-mail' }} />
            <Stack.Screen name="Password Recovery" component={PasswordRecovery} />
          </>
          :
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Questionnaire" component={Questionnaire} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
