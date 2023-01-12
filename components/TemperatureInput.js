import React from "react";
import { TextInput } from "react-native";
import { scaleNames } from "../utils/temperatureUtils";
import styles from "../theme/styles";

// Component for displaying and inputting a temperature in a specific scale
const TemperatureInput = ({ value, scale, onChange }) => {
  // Accessing scaleNames properties through bracket notation
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors
  const placeholder = `Enter temperature in ${scaleNames[scale]}`;
  return (
    <TextInput
      style={styles.text}
      placeholder={placeholder}
      onChangeText={(text) => {
        // Call callback passed as component prop when input text changes
        onChange(text);
      }}
      value={value}
    />
  );
};

export default TemperatureInput;
