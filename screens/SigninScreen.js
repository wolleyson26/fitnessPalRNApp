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
import { signInWithEmailAndPassword } from "../firebase";
import { EMAIL_REGEX_VALIDATION } from "./SignupScreen";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [errResponse, setErrResponse] = useState();

  console.log(date);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPress = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data, navigation, setErrResponse);
  };

  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%'}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={style.container}>
            <View style={style.headerContainer}>
              <Text style={style.header}>Sign In</Text>
            </View>
               {errResponse && <Text style={style.errorMsg}>The email or password provided may be incorrect, please try again.</Text>}
            <View style={[style.form, { marginTop: 50 }]}>
              <View>
                <CustomInput
                  name="email"
                  placeholder="Enter your email"
                  control={control}
                  rules={{ required: "Email is required",  pattern: {
                    value: EMAIL_REGEX_VALIDATION,
                    message: "Please enter a valid email address",
                  } }}
                  label="Enter email"
                  textContentType="email"
                />
                <CustomInput
                  name="password"
                  placeholder="Enter your password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  label="Enter password"
                  textContentType="password"
                  secureTextEntry
                />
              </View>
                <Button title="Forgot password?" onPress={() => navigation.navigate('ForgotPassword')}/>
              <View style={style.buttonComponent}>
                <Button
                  title="Sign In"
                  style={style.button}
                  color="white"
                  onPress={handleSubmit(onSignInPress)}
                />
              </View>
            </View>
            <View style={style.signupButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
               <View style={style.signupContainerButton}>
               <Text style={style.signupButtonContainerText}>Sign Up</Text>
                <Icon
                  name="arrow-forward-ios"
                  type="material"
                  color="#4C97F4"
                />
               </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
