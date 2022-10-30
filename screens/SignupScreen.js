import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import style from "./SignupScreen.scss";
import { Icon } from "@rneui/themed";
import DateField from "react-native-datefield";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import { registerWithEmailAndPassword } from "../firebase";

 export const EMAIL_REGEX_VALIDATION =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX_VALIDATION =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

const RegisterScreen = () => {
  const navigation = useNavigation(); 
  const [errorMsg, setErrorMsg] = useState(""); 

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
    setValue,
  } = useForm();

  const onSignUpPress = (data) => { 
    registerWithEmailAndPassword(data, navigation, setErrorMsg); 
  };

  console.log("errors", errors);
  console.log("getValues", getValues());

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={style.container}>
            <View style={style.headerContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Icon name="arrow-back-ios" type="material" />
              </TouchableOpacity>
              <Text style={style.header}>Sign Up</Text>
            </View>
              {errorMsg && <Text style={style.errorMsg}>Something went wrong. It's possible the email provided has already been used please try again or try signing in with that email address.</Text>}
            <View style={style.form}>
              <View style={style.name}>
                <View>
                  <CustomInput
                    name="firstName"
                    placeholder="First name"
                    control={control}
                    rules={{ required: "First name is required", minLength: 2 }}
                    isShort
                    label="First Name"
                  />
                </View>
                <View>
                  <CustomInput
                    name="lastName"
                    placeholder="Last name"
                    control={control}
                    rules={{ required: "Last name is required", minLength: 2 }}
                    isShort
                    label="Last Name"
                  />
                </View>
              </View>
              <View>
                <CustomInput
                  name="email"
                  placeholder="Email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: EMAIL_REGEX_VALIDATION,
                      message: "Please enter a valid email address",
                    },
                  }}
                  label="Email"
                  textContentType="email"
                />
              </View>
              <CustomInput
                isGender
                name="gender"
                control={control}
                rules={{ required: "Your gender is required" }}
                label="gender"
                setValue={setValue}
                clearErrors={clearErrors}
                values={getValues}
              />
              <View style={style.dateWeightContainer}>
                <View>
                  <CustomInput
                    name="dob"
                    control={control}
                    rules={{ required: "Date of birth is required" }}
                    isDateField
                    label="Date of birth"
                    clearErrors={clearErrors}
                    setValue={setValue}
                  />
                </View>
                <View>
                  <CustomInput
                    name="weight"
                    placeholder="Enter weight"
                    control={control}
                    rules={{ required: "Weight is required" }}
                    label="Weight"
                    keyboardType="numeric"
                    isShort
                  />
                </View>
              </View>
              <View>
                <CustomInput
                  name="password"
                  placeholder="Create your password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: PASSWORD_REGEX_VALIDATION,
                      message:
                        "Password must be at least 1 Uppercase, 1 lowercase, 1 number",
                    },
                  }}
                  label="Create password"
                  textContentType="password"
                  secureTextEntry
                />
              </View>
              <View style={style.buttonComponent}>
                <Button
                  title="Sign Up"
                  style={style.button}
                  color="white"
                  onPress={handleSubmit(onSignUpPress)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
