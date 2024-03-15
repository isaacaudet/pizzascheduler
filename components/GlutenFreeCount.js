import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GlutenFreeCount = ({ smallCount, largeCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gluten-Free Small: {smallCount}</Text>
      <Text style={styles.text}>Gluten-Free Large: {largeCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default GlutenFreeCount;