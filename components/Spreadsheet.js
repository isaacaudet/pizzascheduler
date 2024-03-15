import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Spreadsheet = ({ timeSlots, onAddOrder, onDeleteOrder, onMoveOrder, editMode }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const renderOrder = (order) => {
    const handleOrderPress = () => {
      if (editMode) {
        setSelectedOrder(order);
      }
    };

    return (
      <TouchableOpacity
        key={order.id}
        style={[
          styles.orderContainer,
          order.size === 'small' && styles.smallOrderContainer,
          selectedOrder === order && styles.selectedOrderContainer,
        ]}
        onPress={handleOrderPress}
      >
        <Text style={styles.orderText}>{order.name}</Text>
        <Text style={styles.orderSize}>{order.size}</Text>
        {order.isGlutenFree && <Text style={styles.glutenFreeText}>GF</Text>}
      </TouchableOpacity>
    );
  };

  const renderTimeSlot = (timeSlot, index) => {
    const handleColumnPress = (position) => {
      onAddOrder(timeSlot, position);
    };

    const handleOrderMove = () => {
      if (selectedOrder) {
        onMoveOrder(selectedOrder, timeSlot, selectedOrder.position);
        setSelectedOrder(null);
      }
    };

    return (
      <View key={index} style={styles.timeSlotRow}>
        <View style={styles.timeCell}>
          <Text style={styles.timeSlotText}>{timeSlot.time}</Text>
        </View>
        <TouchableOpacity
        style={[
          styles.orderCell,
          { width: '40%', marginRight: '6%', backgroundColor: 'rgba(255, 0, 0, 0.2)' },
        ]}
          onPress={() => handleColumnPress('left')}
          onLongPress={handleOrderMove}
        >
          <View style={styles.orderRow}>
            {timeSlot.orders
              .filter((order) => order.position === 'left')
              .map(renderOrder)}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.orderCell,
          { width: '40%', marginLeft: '5%', backgroundColor: 'rgba(0, 255, 0, 0.2)' },
        ]}
          onPress={() => handleColumnPress('right')}
          onLongPress={handleOrderMove}
        >
          <View style={styles.orderRow}>
            {timeSlot.orders
              .filter((order) => order.position === 'right')
              .map(renderOrder)}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={styles.container}>
        <View style={[styles.verticalLine, styles.leftLine]} />
        <View style={[styles.verticalLine, styles.centerLine]} />
        <ScrollView>
          {timeSlots.map(renderTimeSlot)}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  verticalLine: {
    position: 'absolute',
    width: 1,
    backgroundColor: '#ccc',
    top: 0,
    bottom: 0,
  },
  leftLine: {
    left: '8%',
  },
  centerLine: {
    left: '50%',
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  timeCell: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCell: {
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  orderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: '1',
    alignItems: 'flex-start',
  },
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
  selectedOrderContainer: {
    borderWidth: 2,
    borderColor: 'blue',
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
});

export default Spreadsheet;