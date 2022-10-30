import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import HomeStyles from "./HomeScreen.scss";
import stepsIcon from "../assets/stepsIcon.png";
import Arrows from "../assets/arrow.png";
import ArrowRight from "../assets/arrow-right.png";
import Weight from "../assets/weight.png";
import Check from "../assets/check.png";
import ExercisePreview from "../components/ExercisePreview";
import BottomSheet, { MAX_TRANSLATE_Y } from "../components/BottomSheet";
import Navigation from "../components/Navigation";
import { useCallback, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const HomeScreen = () => {
  let greeting;

  var data = [
      [0, 4, "Good night"],
      [5, 11, "Good morning"], //Store messages in an array
      [12, 17, "Good afternoon"],
      [17, 22, "Good evening"],
      [22, 24, "Good night"],
    ],
    hr = new Date().getHours();

    console.log(hr)

  for (var i = 0; i < data.length; i++) {
    if (hr >= data[i][0] && hr <= data[i][1]) {
      greeting = data[i][2];
    }
  }

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const ref = useRef(null);

  const onPress = useCallback(
    () => ref?.current?.scrollTo(MAX_TRANSLATE_Y),
    []
  );

  return (
    <SafeAreaView>
      <View style={HomeStyles.container}>
        <Navigation />
        <Text style={HomeStyles.greeting}>{greeting} Nelson</Text>
        <Text style={HomeStyles.heading}>Ready for a challenge?</Text>
        <View style={HomeStyles.stepsContainer}>
          <Image source={stepsIcon} />
          <View>
            <Text>New challenge 🔥 </Text>
            <Text style={HomeStyles.stepsContainerText}>
              <Text style={HomeStyles.boldText}>4000</Text> Steps
            </Text>
          </View>
          <Image source={Arrows} />
        </View>
        <View style={HomeStyles.yourWorkoutsSection}>
          <View style={HomeStyles.yourWorkoutsSectionHeader}>
            <Text style={HomeStyles.yourWorkoutsSectionHeaderText}>
              Your Workout
            </Text>
            <TouchableOpacity onPress={onPress}>
              <Image source={ArrowRight} />
            </TouchableOpacity>
          </View>
          <View style={HomeStyles.card}>
            <Image source={Weight} />
            <Text style={HomeStyles.cardText}>Weight Lifting</Text>
            <View style={HomeStyles.cardInnerFlex}>
              <Text style={HomeStyles.cardText}>5 Sets</Text>
              <Image source={Check} style={HomeStyles.cardIcon} />
            </View>
          </View>
        </View>
        <BottomSheet ref={ref}>
          <ExercisePreview />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
