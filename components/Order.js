import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Order = ({ order, onDeleteOrder, onPress, editMode }) => {
  const handlePress = () => {
    if (editMode) {
    console.log('Moving order:', order); // Log the order being moved

      onPress();

    }
  };

  const handleLongPress = () => {
    if (editMode) {
      onDeleteOrder(order.id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.orderContainer,
        order.size === 'small' && styles.smallOrderContainer,
        order.isGlutenFree && styles.glutenFreeOrderContainer,
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Text style={styles.orderText}>{order.name}</Text>
      <Text style={styles.orderSize}>{order.size}</Text>
      {order.isGlutenFree && <Text style={styles.glutenFreeText}>GF</Text>}
      {editMode && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDeleteOrder(order.id)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 8,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  smallOrderContainer: {
    backgroundColor: '#ffcccc',
  },
  glutenFreeOrderContainer: {
    borderWidth: 1,
    borderColor: 'green',
  },
  orderText: {
    fontSize: 14,
    marginRight: 8,
  },
  orderSize: {
    fontSize: 12,
    color: 'gray',
    marginRight: 8,
  },
  glutenFreeText: {
    fontSize: 12,
    color: 'green',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Order;