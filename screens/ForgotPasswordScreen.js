import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import style from "./SignupScreen.scss";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { Button } from "react-native";
import { sendPasswordResetEmail } from "../firebase";
import { EMAIL_REGEX_VALIDATION } from "./SignupScreen";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    sendPasswordResetEmail(data.email)
  };

  return (
    <View style={[style.container, { marginTop: 50 }]}>
      <View style={style.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Icon name="arrow-back-ios" type="material" />
        </TouchableOpacity>
        <Text style={[style.header, { fontSize: 30 }]}>Forgot Password</Text>
      </View>
      <Text style={{ textAlign: "center", marginTop: 30 }}>
        Please enter your email address. You will receive a link to create a new
        password via email.
      </Text>
      <View style={{ marginTop: 40 }}>
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: "Email is required",  pattern: {
            value: EMAIL_REGEX_VALIDATION,
            message: "Please enter a valid email address",
          } }}
          label="Email"
          textContentType="email"
        />
      </View>
      <View style={style.buttonComponent}>
        <Button
          title="Reset password"
          style={style.button}
          color="white"
          onPress={handleSubmit(onsubmit)}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
