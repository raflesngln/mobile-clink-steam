import { Center } from "@/components/ui/center";
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import Animated, { BounceIn } from 'react-native-reanimated';


const NetworkStatus = () => {
  const [hasInternet, setHasInternet] = useState(true);
  useFocusEffect(
    useCallback(() => {
      const netInfoSubscription = NetInfo.addEventListener(state => {
        setHasInternet(state.isConnected);
      });
      return () => {
        netInfoSubscription();
      };
    }, []),
  );
  return !hasInternet ? (
    <Animated.View entering={BounceIn.delay(400)} style={styles.container}>
      <Center>
        <Text style={styles.textColor}> Tidak Ada Jaringan Internet !</Text>
      </Center>

      <Text
        numberOfLines={3}
        style={{color: '#8c6406', fontVariant: 'italic', marginTop: 6}}>
        Silahkan Aktifkan Jaringan Internet Anda
      </Text>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    position: 'absolute',
    zIndex: 1,
    top: hasNotch() ? 80 : 20,
    marginHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: '#ffde8a',
    borderRadius: 10,
    elevation: 22, // Android shadow
    shadowColor: '#000000', // iOS shadow
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.9,
    shadowRadius: 8,
    borderStartWidth: 12,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    borderLeftColor: '#fa3a0a',
    borderBlockStartColor: '#face61',
    borderBlockEndColor: '#face61',
    borderRightColor: '#face61',
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  textColor: {
    textAlign: 'left',
    color: '#ff4c05',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default NetworkStatus;
