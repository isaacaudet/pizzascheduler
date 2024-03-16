import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spreadsheet from './components/Spreadsheet';
import OrderPopup from './components/OrderPopup';
import GlutenFreePopup from './components/GlutenFreePopup';
import SettingsPopup from './components/SettingsPopup';

const STORAGE_KEY = 'pizzaSchedulerData';

const generateTimeSlots = () => {
  const timeSlots = [];
  let hour = 11;
  let minute = 0;

  while (hour < 23 || (hour === 23 && minute === 0)) {
    const timeSlot = {
      id: `${hour}:${minute < 10 ? '0' : ''}${minute}`,
      time: `${hour}:${minute < 10 ? '0' : ''}${minute}`,
      orders: [],
    };
    timeSlots.push(timeSlot);

    minute += 7;
    if (minute >= 60) {
      hour += 1;
      minute = 0;
    }
  }

  return timeSlots;
};

const App = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [glutenFreeSmallCount, setGlutenFreeSmallCount] = useState(0);
  const [glutenFreeLargeCount, setGlutenFreeLargeCount] = useState(0);
  const [isGlutenFreePopupVisible, setIsGlutenFreePopupVisible] = useState(false);
  const [inboxVisible, setInboxVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [timeSlots, glutenFreeSmallCount, glutenFreeLargeCount]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data !== null) {
        const { timeSlots, glutenFreeSmallCount, glutenFreeLargeCount } = JSON.parse(data);
        setTimeSlots(timeSlots);
        setGlutenFreeSmallCount(glutenFreeSmallCount);
        setGlutenFreeLargeCount(glutenFreeLargeCount);
      } else {
        setTimeSlots(generateTimeSlots());
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      const data = JSON.stringify({
        timeSlots,
        glutenFreeSmallCount,
        glutenFreeLargeCount,
      });
      await AsyncStorage.setItem(STORAGE_KEY, data);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const openOrderPopup = (timeSlot, position) => {
    setSelectedTimeSlot(timeSlot);
    setSelectedPosition(position);
  };

  const closeOrderPopup = () => {
    setSelectedTimeSlot(null);
    setSelectedPosition(null);
  };

  const addOrder = (order) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.id === selectedTimeSlot.id) {
        const newOrder = {
          ...order,
          id: Date.now().toString(),
          position: selectedPosition,
          timeSlotId: selectedTimeSlot.id,
        };
        const updatedOrders = [...slot.orders];
        if (selectedPosition === 'left') {
          updatedOrders.push(newOrder);
        } else {
          updatedOrders.push(newOrder);
        }
        if (order.isGlutenFree) {
          if (order.size === 'small') {
            setGlutenFreeSmallCount((prevCount) => prevCount - 1);
          } else {
            setGlutenFreeLargeCount((prevCount) => prevCount - 1);
          }
        }
        return {
          ...slot,
          orders: updatedOrders,
        };
      }
      return slot;
    });

    setTimeSlots(updatedTimeSlots);
    closeOrderPopup();
  };

  const deleteOrder = (order) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.id === order.timeSlotId) {
        const updatedOrders = slot.orders.filter((o) => o.id !== order.id);
        if (order.isGlutenFree) {
          if (order.size === 'small') {
            setGlutenFreeSmallCount((prevCount) => prevCount + 1);
          } else if (order.size === 'large') {
            setGlutenFreeLargeCount((prevCount) => prevCount + 1);
          }
        }
        return {
          ...slot,
          orders: updatedOrders,
        };
      }
      return slot;
    });

    setTimeSlots(updatedTimeSlots);
  };

  const moveOrder = (order, targetTimeSlot, targetPosition) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.id === order.timeSlotId) {
        const updatedOrders = slot.orders.filter((o) => o.id !== order.id);
        return {
          ...slot,
          orders: updatedOrders,
        };
      }
      if (slot.id === targetTimeSlot.id) {
        const updatedOrders = [...slot.orders];
        const targetOrders = updatedOrders.filter((o) => o.position === targetPosition);
        if (
          (targetOrders.length === 0 && order.size === 'large') ||
          (targetOrders.length < 2 && order.size === 'small')
        ) {
          updatedOrders.push({
            ...order,
            position: targetPosition,
            timeSlotId: targetTimeSlot.id,
          });
          return {
            ...slot,
            orders: updatedOrders,
          };
        }
      }
      return slot;
    });

    setTimeSlots(updatedTimeSlots);
  };

  const receivePOSOrder = (order) => {
    const { name, size, isGlutenFree, timestamp } = order;
    const currentTime = new Date();
    const orderTime = new Date(timestamp);

    const soonestTimeSlot = timeSlots.find((slot) => {
      const slotTime = new Date(`${currentTime.toDateString()} ${slot.time}`);
      return slotTime >= orderTime;
    });

    if (soonestTimeSlot) {
      const leftOrders = soonestTimeSlot.orders.filter((o) => o.position === 'left');
      const rightOrders = soonestTimeSlot.orders.filter((o) => o.position === 'right');

      if (size === 'small') {
        if (leftOrders.length < 2) {
          addOrder({ name, size, isGlutenFree }, soonestTimeSlot, 'left');
        } else if (rightOrders.length < 2) {
          addOrder({ name, size, isGlutenFree }, soonestTimeSlot, 'right');
        } else {
          console.log('No available position for a small pizza in the soonest time slot.');
        }
      } else if (size === 'large') {
        if (leftOrders.length === 0) {
          addOrder({ name, size, isGlutenFree }, soonestTimeSlot, 'left');
        } else if (rightOrders.length === 0) {
          addOrder({ name, size, isGlutenFree }, soonestTimeSlot, 'right');
        } else {
          console.log('No available position for a large pizza in the soonest time slot.');
        }
      }
    } else {
      console.log('No available time slot for the order.');
    }
  };

  const openGlutenFreePopup = () => {
    setIsGlutenFreePopupVisible(true);
  };

  const closeGlutenFreePopup = () => {
    setIsGlutenFreePopupVisible(false);
  };

  const updateGlutenFreeCount = (smallCount, largeCount) => {
    setGlutenFreeSmallCount(smallCount);
    setGlutenFreeLargeCount(largeCount);
  };

  const toggleInbox = () => {
    setInboxVisible((prevVisible) => !prevVisible);
  };

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const openSettingsPopup = () => {
    setIsSettingsPopupVisible(true);
  };

  const closeSettingsPopup = () => {
    setIsSettingsPopupVisible(false);
  };

  const clearDay = () => {
    setTimeSlots(generateTimeSlots());
    setGlutenFreeSmallCount(0);
    setGlutenFreeLargeCount(0);
  };

  const incrementTimeSlots = (minutes) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      const [hours, mins] = slot.time.split(':');
      const newTime = new Date();
      newTime.setHours(parseInt(hours, 10));
      newTime.setMinutes(parseInt(mins, 10) + minutes);
      const newHours = newTime.getHours();
      const newMinutes = newTime.getMinutes();
      const formattedTime = `${newHours}:${newMinutes < 10 ? '0' : ''}${newMinutes}`;
      return {
        ...slot,
        time: formattedTime,
      };
    });
    setTimeSlots(updatedTimeSlots);
  };

  const getSoonestAvailableTimeSlot = () => {
    const currentTime = new Date();
    return timeSlots.find((slot) => {
      const slotTime = new Date(`${currentTime.toDateString()} ${slot.time}`);
      return (
        slotTime >= currentTime &&
        slot.orders.filter((o) => o.position === 'left').length < 2 &&
        slot.orders.filter((o) => o.position === 'right').length < 2
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
          <Text style={styles.editButtonText}>{editMode ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.glutenFreeButton} onPress={openGlutenFreePopup}>
          <Text style={styles.glutenFreeButtonText}>
            Gluten-Free Count: {glutenFreeSmallCount} Small, {glutenFreeLargeCount} Large
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inboxButton} onPress={toggleInbox}>
          <Text style={styles.inboxButtonText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={openSettingsPopup}>
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      {inboxVisible && (
        <View style={styles.inbox}>
          {/* Render inbox content */}
          <Text>Inbox</Text>
        </View>
      )}
      <Spreadsheet
        timeSlots={timeSlots}
        onAddOrder={openOrderPopup}
        onDeleteOrder={deleteOrder}
        onMoveOrder={moveOrder}
        editMode={editMode}
        soonestAvailableTimeSlot={getSoonestAvailableTimeSlot()}
      />
      <OrderPopup
        visible={selectedTimeSlot !== null}
        onClose={closeOrderPopup}
        onSubmit={addOrder}
      />
      <GlutenFreePopup
        visible={isGlutenFreePopupVisible}
        onClose={closeGlutenFreePopup}
        smallCount={glutenFreeSmallCount}
        largeCount={glutenFreeLargeCount}
        onUpdate={updateGlutenFreeCount}
      />
      <SettingsPopup
        visible={isSettingsPopupVisible}
        onClose={closeSettingsPopup}
        onClearDay={clearDay}
        onIncrementTimeSlots={incrementTimeSlots}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  glutenFreeButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  glutenFreeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inboxButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  inboxButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inbox: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;