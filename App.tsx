import React, {useEffect} from 'react';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function HomeScreen() {
  const onPress = async () => {
    try {
      await Linking.openURL('http://mytubesite.com/home/2');
    } catch (e) {
      console.log('E', e);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>CLICK ME!</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['mytube://'],
  config: {
    screens: {
      Home: 'home/:homeId',
    },
  },
};

function App() {
  useEffect(() => {
    Linking.addEventListener('url', e => {
      console.log('FOUND URL', e);
    });
    return () => {
      // Todo: remove this
      Linking.removeAllListeners('url');
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
