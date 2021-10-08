import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CustomPicker from './src/CustomPicker';

const { width, height } = Dimensions.get('window');

const data = [
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
];

const data1 = ['female', 'male'];

export default function App() {
  const onSizeChange = (value, type) => {
    if (type === 'gender') {
      console.log('gender', value);
      return;
    }
    console.log('size', value);
    return;
  };

  return (
    <View style={styles.container}>
      <Text>custom Picker</Text>
      <View
        style={{
          //flex: 1,

          flexDirection: 'row',
          marginTop: 76,
          // height: 0,
          //  width: 400,
          //backgroundColor: "pink",
          //  borderWidth: 1,
          marginBottom: 37,
        }}
      >
        <CustomPicker
          onChangeValue={(value) => console.log('value', value)}
          data={data1}
          textStyle={styles.listText}
          width={40}
          initialIndex={0}
          horizontalLeft={width / 4}
          onValueChange={(value) => onSizeChange(value, 'gender')}
        />
        <CustomPicker
          data={data}
          textStyle={styles.listText}
          width={40}
          initialIndex={6}
          horizontalLeft={10}
          onValueChange={(value) => onSizeChange(value, 'size')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  listText: {
    fontSize: 16,
    color: 'black',
  },
});
