import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const SettingsPopup = ({
  visible,
  onClose,
  onClearDay,
  onIncrementTimeSlots,
  onDecrementTimeSlots,
}) => {
  const [incrementMinutes, setIncrementMinutes] = useState('');
  const [decrementMinutes, setDecrementMinutes] = useState('');

  const handleClearDay = () => {
    onClearDay();
    onClose();
  };

  const handleIncrementTimeSlots = () => {
    const minutes = parseInt(incrementMinutes, 10);
    if (!isNaN(minutes)) {
      onIncrementTimeSlots(minutes);
      setIncrementMinutes('');
    }
  };

  const handleDecrementTimeSlots = () => {
    const minutes = parseInt(decrementMinutes, 10);
    if (!isNaN(minutes)) {
      onDecrementTimeSlots(minutes);
      setDecrementMinutes('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearDay}>
            <Text style={styles.clearButtonText}>Clear Day</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Increment Time Slots (minutes):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={incrementMinutes}
              onChangeText={setIncrementMinutes}
            />
            <TouchableOpacity style={styles.button} onPress={handleIncrementTimeSlots}>
              <Text style={styles.buttonText}>Increment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Decrement Time Slots (minutes):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={decrementMinutes}
              onChangeText={setDecrementMinutes}
            />
            <TouchableOpacity style={styles.button} onPress={handleDecrementTimeSlots}>
              <Text style={styles.buttonText}>Decrement</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 16,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
    width: 80,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsPopup;