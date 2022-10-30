import { View, Text, Image } from "react-native";
import React from "react";
import exercise from "./ExercisePreview.scss";
import Trainer from "../assets/fitness-trainer.png";
import Boot from "../assets/boot.png";

const ExercisePreview = () => {
  return (
    <>
      <View style={exercise.container}>
        <Text style={exercise.workoutTypeButton}>Upper Body</Text>
        <Image style={exercise.trainerImage} source={Trainer} />
        <Text style={exercise.timeText}>40 mins</Text>
        <View style={exercise.exercisesCardStack}>
          <View style={exercise.stepsCard}>
            <Image style={exercise.boot} source={Boot} />
            <Text style={exercise.stepsCardText}>
              <Text style={exercise.exercisesTextBold}>5,000</Text> of 10,000 Steps today
            </Text>
          </View>
          <View style={exercise.exercisesCard}>
            <View>
              <Text style={exercise.exercisesText}>Includes</Text>
              <Text style={exercise.exercisesTextBold}>
                5 Upper Body exercises
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={exercise.startContainer}>
        <Text style={exercise.start}>Start</Text>
        <Text style={exercise.preview}>Preview</Text>
      </View>
    </>
  );
};

export default ExercisePreview;
