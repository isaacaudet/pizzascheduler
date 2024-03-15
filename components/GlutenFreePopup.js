import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const GlutenFreePopup = ({ visible, onClose, smallCount, largeCount, onUpdate }) => {
  const [updatedSmallCount, setUpdatedSmallCount] = useState(smallCount);
  const [updatedLargeCount, setUpdatedLargeCount] = useState(largeCount);

  const handleUpdate = () => {
    onUpdate(updatedSmallCount, updatedLargeCount);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Update Gluten-Free Count</Text>
          <View style={styles.countContainer}>
            <Text style={styles.label}>Small:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={updatedSmallCount.toString()}
              onChangeText={(text) => setUpdatedSmallCount(parseInt(text) || 0)}
            />
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.label}>Large:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={updatedLargeCount.toString()}
              onChangeText={(text) => setUpdatedLargeCount(parseInt(text) || 0)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default GlutenFreePopup;