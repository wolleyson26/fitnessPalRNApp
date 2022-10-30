import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import NavStyles from "./Navigation.scss";
import { Icon } from "@rneui/themed";
import moment from "moment";
import DateSlider from "./DateSlider";
import { useNavigation } from '@react-navigation/native';

const Navigation = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={NavStyles.container}>
        <TouchableOpacity onPress={() => navigation.push('Signin')}>
          <View style={NavStyles.menu}>
            <Text style={NavStyles.text}>..</Text>
          </View>
        </TouchableOpacity>
        <View style={NavStyles.date}>
          <Text style={NavStyles.dateText}>
            {moment(new Date()).format("MMM, YYYY")}
          </Text>
          <Icon name="expand-more" type="material" />
        </View>
        <TouchableOpacity onPress={() => navigation.push('Signup')}>
        <Icon
          name="user"
          type="antdesign"
          size="30"
          raised
          containerStyle={{ background: "#f5f5f5" }}
        />
        </TouchableOpacity>
      </View>
      <DateSlider />
    </>
  );
};

export default Navigation;
