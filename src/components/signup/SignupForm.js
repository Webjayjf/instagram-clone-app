import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import * as Yup from "yup";
import MessageModal from "../shared/modals/MessageModal";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const SignupForm = ({ navigation }) => {
  

  

  return (
    <View style={styles.container}>
      
      
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  


  

      
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20
  },
  inputField: {
    marginTop: 14,
    backgroundColor: "#111",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    paddingLeft: 15,
    paddingRight: 25,
    marginHorizontal: 20,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    width: "95%",
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 20,
    marginRight: 20,
  },
  forgotText: {
    color: "#1af",
    fontWeight: "700",
  },
  loginBtn: {
    backgroundColor: "#1af",
    color: "#fff",
  },
  btnContainer: (isValid) => ({
    marginTop: 35,
    alignItems: "center",
    backgroundColor: "#07f",
    opacity: isValid ? 1 : 0.6,
    marginHorizontal: 20,
    justifyContent: "center",
    alignContent: "center",
    height: Platform.OS === "android" ? 56 : 54,
    borderRadius: 10,
  }),
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  modalContainer: {
    marginTop: 14,
    marginHorizontal: 20,
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 20,
    gap: 12,
  },
  modalText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginBottom: Platform.OS === "android" ? 4 : 0,
  },
});
