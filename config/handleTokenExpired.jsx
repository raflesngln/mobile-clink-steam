 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const checkhandleTokenExpiry = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('tokenLogin');

    if (!token) {
      return false; // Token doesn't exist or is expired
    }

    // Decode the token
    const decodedToken = jwtDecode(token);
    // Check if the token has expired
    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
    if (isTokenExpired) {
      // Clear the token from storage
      await AsyncStorage.removeItem('tokenLogin');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return false; // Handle errors gracefully
  }
};

const ProfileComponent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const check = await checkhandleTokenExpiry();
      if (!check) {
        navigation.navigate('Login');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default ProfileComponent;
