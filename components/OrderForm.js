import React from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const OrderForm = ({ addOrder }) => {
  const [name, setName] = React.useState('');
  const [isSmall, setIsSmall] = React.useState(false);
  const [isGlutenFree, setIsGlutenFree] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  const handleSubmit = () => {
    const newOrder = {
      id: Date.now(),
      name,
      isSmall,
      isGlutenFree,
      time: time.toLocaleTimeString(),
    };
    addOrder(newOrder);
    setName('');
    setIsSmall(false);
    setIsGlutenFree(false);
    setTime(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Small:</Text>
        <Switch value={isSmall} onValueChange={setIsSmall} />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Gluten-Free:</Text>
        <Switch value={isGlutenFree} onValueChange={setIsGlutenFree} />
      </View>
      <DateTimePicker
        value={time}
        mode="time"
        display="default"
        onChange={(event, selectedTime) => setTime(selectedTime)}
      />
      <Button title="Add Order" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default OrderForm;