import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const loginUser = () => {
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        /* ... */
        console.log(querySnapshot.docs[0]._data);
        gotonext();
      });
  };
  const gotonext = async () => {
    await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');
    navigation.navigate('Main');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'LogIn'}</Text>
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        value={pass}
        onChangeText={txt => setPass(txt)}
      />

      <CustomButton
        bg={'#E27800'}
        title={'LogIn'}
        color={'#fff'}
        onClick={() => {
          loginUser();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        {'SignUp'}
      </Text>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
