import React, { useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ITEM_HEIGHT = 40;
const ITEM_WIDTH = 40;
const SPACING = 15;

const PickerList = (props) => {
  const { data, scrollY } = props;

  const renderItem = useCallback(({ item, index }) => {
    const inputRange = [
      (index - 4) * ITEM_HEIGHT,
      (index - 3) * ITEM_HEIGHT,
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
      (index + 3) * ITEM_HEIGHT,
      (index + 4) * ITEM_HEIGHT,
    ];
    const scaleInterpolator = scrollY.interpolate({
      inputRange,
      outputRange: [0.6, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7, 0.6],
    });

    const opacityInterpolator = scrollY.interpolate({
      inputRange,
      outputRange: [0.1, 0.2, 0.3, 0.4, 1, 0.4, 0.3, 0.2, 0.1],
    });

    return (
      <Animated.View
        style={[
          styles.listTextView,
          {
            transform: [{ scale: scaleInterpolator }],
            opacity: opacityInterpolator,
          },
          { width: 1.5 * props.width },
        ]}
      >
        <Text style={props.textStyle}>{item}</Text>
      </Animated.View>
    );
  }, []);

  const keyExtractor = (item) => {
    return String(item);
  };

  return (
    <Animated.FlatList
      initialScrollIndex={props.initialIndex}
      initialNumToRender={7}
      maxToRenderPerBatch={9}
      windowSize={9}
      getItemLayout={(_, index) => {
        return {
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        };
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={2000}
      data={data}
      keyExtractor={keyExtractor}
      style={{
        marginLeft: props.horizontalLeft,
        height: 9 * ITEM_HEIGHT,
        flexGrow: 0,
        width: props.width + 3 * SPACING,
      }}
      contentContainerStyle={{
        paddingTop: 4 * ITEM_HEIGHT,
        paddingBottom: 4 * ITEM_HEIGHT,
        alignItems: 'center',
      }}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate={0}
      snapToAlignment="center"
      renderItem={renderItem}
    />
  );
};

const List = React.memo(PickerList);

const CustomPicker = ({ ...props }) => {
  const { data } = props;
  let ScrollY = useRef(new Animated.Value(0)).current;

  let value = data[props.initialIndex];
  let maxLen = data.length;

  useEffect(() => {
    ScrollY.addListener((animation) => {
      const index = Math.floor(animation.value / ITEM_HEIGHT);
      value = data[index >= 0 && index <= maxLen - 1 ? index : 0];
      props.onValueChange(value);
    });

    return () => {
      ScrollY.removeAllListeners();
    };
  });

  return (
    <View style={[styles.root]}>
      <View style={styles.root}>
        <View style={styles.picker}>
          <View style={styles.indicator} pointerEvents="none" />
          <List
            data={data}
            scrollY={ScrollY}
            textStyle={props.textStyle}
            width={props.width}
            horizontalLeft={props.horizontalLeft}
            initialIndex={props.initialIndex}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 250,
    // borderWidth: 1,
  },
  picker: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  indicator: {
    height: 35,
    width: '100%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#CCCCCC',
    backgroundColor: 'white',
    position: 'absolute',
    opacity: 0.2,
  },
  listTextView: {
    paddingBottom: 3,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomPicker;
