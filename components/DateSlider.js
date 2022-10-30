import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  subDays,
  format,
} from "date-fns";
import { PagerView } from "react-native-pager-view";
import style from "./DateSlider.scss";
// import SmoothPicker from "react-native-smooth-picker";

const dates = eachWeekOfInterval(
  {
    start: new Date(),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: new Date().getDay(),
  }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);

  return acc;
}, []);

console.log(dates);
console.log('new Date()', new Date().getDay());

const DateSlider = () => {
    const [selected, setSelected] = useState();

const handleChange = index => {
    console.log(index);
    setSelected(index);
  };

  return (
    <ScrollView
      style={style.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToInterval={20}
      snapToAlignment={'center'}
      pagingEnabled
      decelerationRate={0}
    >
    <>
      {dates.map((week, i) => {
        return (
          <View key={i}>
            <View style={style.row}>
              {week.map((day, i) => {
                console.log(day.toDateString());
                const dateText = format(day, "eee");
                return ( 
                    <View key={i} style={style.dateContainer}>
                      <Text style={style.dateContainerDigit}>
                        {day.getDate()}
                      </Text>
                      <Text style={style.dateContainerday}>{dateText}</Text>
                    </View> 
                //     <SmoothPicker
                //     offsetSelection={40}
                //     // magnet 
                //     scrollAnimation
                //     data={[day.toDateString()]}
                //     onSelected={({ item, index }) => handleChange(index)}
                //     renderItem={({ item, index }) => (
                //       <Text selected={index === selected}>{item}</Text>
                //     )}
                //   />
                );
              })}
            </View>
          </View>
        );
      })}
      </>
    </ScrollView>
  );
};

export default DateSlider;
