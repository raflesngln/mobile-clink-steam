
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface componentNameProps {}

const componentName = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>componentName</Text>
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {}
});
