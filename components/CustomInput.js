import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Controller } from "react-hook-form";
import style from "./CustomInput.scss";
import DateField from "react-native-datefield";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  textContentType,
  isShort,
  label,
  keyboardType,
  isDateField,
  clearErrors,
  setValue,
  isGender,
  values
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState();

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDate(moment(date).format("MM-DD-YYYY"));
    setValue("dob", date);
    clearErrors("dob");
    setShowDatePicker(false);
  };

  const handleSelect = (selected) => { 
    setValue('gender', selected);
    clearErrors('gender');
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        if (isDateField) {
          return (
            <>
              {console.log("value", value)}
              <View>
                <Text style={style.label}>{label}</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <View pointerEvents="none">
                    <TextInput
                      style={[
                        style.textInput,
                        style.textInputShort,
                        error && style.error,
                      ]}
                      value={date}
                      placeholder="Your birthdate"
                      name="dob"
                    />
                  </View>
                </Pressable>
                <View>
                  <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setShowDatePicker(false)}
                    isDarkModeEnabled
                    minimumDate={new Date(1900, 0, 1)}
                    maximumDate={new Date()}
                    name="dob"
                  />
                </View>
              </View>
              {error && (
                <Text style={style.errorText}>{error.message || "Error"}</Text>
              )}
            </>
          );
        } else if (isGender) {
            return (
              <View name='gender'>
                <Text style={style.label}>Gender</Text>
                <View style={style.genderFlex}>
                  <Pressable style={[style.genderBox, values().gender === 'm' && style.selected]} onPress={()=>handleSelect('m')}> 
                      <Text style={style.text}>Male</Text> 
                  </Pressable>
                  <Pressable style={[style.genderBox, values().gender === 'f' && style.selected]} onPress={()=>handleSelect('f')}> 
                      <Text style={style.text}>Female</Text>
                  </Pressable>
                  <Pressable style={[style.genderBox, values().gender === 'o' && style.selected]} onPress={()=>handleSelect('o')}> 
                      <Text style={style.text}>Other</Text> 
                  </Pressable>
                </View>
                {error && (
                <Text style={style.errorText}>{error.message || "Error"}</Text>
              )}
              </View>  
            )
        } else {
            return (
              <>
                <View>
                  <Text style={style.label}>{label}</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    style={[
                      style.textInput,
                      isShort && style.textInputShort,
                      error && style.error,
                    ]}
                    secureTextEntry={secureTextEntry}
                    textContentType={textContentType}
                    keyboardType={keyboardType}
                  />
                </View>
                {error && (
                  <Text style={style.errorText}>{error.message || "Error"}</Text>
                )}
              </>
            );
          }
      }}
    />
  );
};

export default CustomInput;
