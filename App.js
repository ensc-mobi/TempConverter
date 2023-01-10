import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

// Scale names used for display
const scaleNames = { c: "Celsius", f: "Fahrenheit" };

// Celsius/Fahrenheit conversion functions
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Convert a temperature using a given conversion function
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  // Call the conversion function on input
  const output = convert(input);
  // Keep the output rounded to the third decimal place:
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// Component displaying if the water would boil or not, depending on the temperature
// We choose the Celsius scale for easier comparison with the boiling temperature
const BoilingResult = ({ tempCelsius }) => {
  let message = "";
  if (!Number.isNaN(tempCelsius)) {
    message =
      tempCelsius >= 100 ? "The water would boil" : "The water would not boil";
  }
  return <Text style={styles.text}>{message}</Text>;
};

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

// Main component
export default App = () => {
  // Common state is lifted here because this component is the closest parent of TemperatureInput components.
  // We store only the most recently changed input with its scale.
  // Temperature is stored as a string to handle missing values.
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  // Compute temperatures in both scales
  const tempCelsius =
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const tempFahrenheit =
    scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <View style={styles.container}>
      {/* Display and input in Celsius degrees */}
      <TemperatureInput
        value={tempCelsius}
        scale="c"
        onChange={(newTemp) => {
          setTemperature(newTemp);
          setScale("c");
        }}
      />
      {/* Display and input in Fahrenheit degrees */}
      <TemperatureInput
        value={tempFahrenheit}
        scale="f"
        onChange={(newTemp) => {
          setTemperature(newTemp);
          setScale("f");
        }}
      />
      <BoilingResult tempCelsius={parseFloat(tempCelsius)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    paddingBottom: 10,
  },
});
