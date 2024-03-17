import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Spreadsheet = ({ timeSlots, onAddOrder, onDeleteOrder, onMoveOrder, editMode }) => {
  console.log('Spreadsheet received timeSlots:', timeSlots); // Add this line
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const renderOrder = (order) => {
  const handleOrderPress = () => {
  if (editMode) {
    console.log('Selected order:', order); // Log the selected order object
    console.log('Order details:', JSON.stringify(order, null, 2)); // Log the o
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
      {editMode && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDeleteOrder(order)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const renderTimeSlot = (timeSlot, index) => {
const handleColumnPress = (position) => {
if (editMode && selectedOrder) {
console.log('Moving order to position:', position); // Log the target position


onMoveOrder(selectedOrder, timeSlot, position);
setSelectedOrder(null);
} else {
onAddOrder(timeSlot, position);
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
        { width: '40%', marginRight: '6%',  },
      ]}
      onPress={() => handleColumnPress('left')}
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
        { width: '40%', marginLeft: '5%',  },
      ]}
      onPress={() => handleColumnPress('right')}
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

export default Spreadsheet;