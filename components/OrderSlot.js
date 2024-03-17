import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Order from './Order';

const OrderSlot = ({ position, orders, onAddOrder, onDeleteOrder, onMoveOrder, editMode }) => {
  const handlePress = () => {
    if (!editMode) {
      onAddOrder();
    }
  };

  const handleOrderPress = (orderId) => {
    if (editMode) {
      onMoveOrder(orderId);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.orderSlot, position === 'right' && styles.rightOrderSlot]}
      onPress={handlePress}
    >
      <View style={styles.orderRow}>
        {orders.map((order) => (
          <Order
            key={order.id}
            order={order}
            onDeleteOrder={onDeleteOrder}
            onPress={() => handleOrderPress(order.id)}
            editMode={editMode}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  rightOrderSlot: {
    marginLeft: 4,
  },
  orderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default OrderSlot;