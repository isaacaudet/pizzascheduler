import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Switch } from 'react-native';

const OrderPopup = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('large');
  const [isGlutenFree, setIsGlutenFree] = useState(false);

  const handleSubmit = () => {
    onSubmit({ name, size, isGlutenFree });
    setName('');
    setSize('large');
    setIsGlutenFree(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Order</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.sizeContainer}>
            <Text style={styles.label}>Size:</Text>
            <TouchableOpacity
              style={[styles.sizeButton, size === 'small' && styles.selectedSizeButton]}
              onPress={() => setSize('small')}
            >
              <Text style={styles.sizeButtonText}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sizeButton, size === 'large' && styles.selectedSizeButton]}
              onPress={() => setSize('large')}
            >
              <Text style={styles.sizeButtonText}>Large</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Gluten-Free:</Text>
            <Switch value={isGlutenFree} onValueChange={setIsGlutenFree} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    },
    sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    },
    label: {
    fontSize: 16,
    marginRight: 8,
    },
    sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    },
    selectedSizeButton: {
    backgroundColor: '#ccc',
    },
    sizeButtonText: {
    fontSize: 16,
    },
    switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    
    export default OrderPopup;