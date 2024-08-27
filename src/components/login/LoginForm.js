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
import firebase from "firebase/compat/app";
import MessageModal from "../shared/modals/MessageModal";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const LoginForm = ({ navigation }) => {
  const [obsecureText, setObsecureText] = useState(true);
  const [emailOnFocus, setEmailOnFocus] = useState(false);
  const [emailToValidate, SetEmailToValidate] = useState(false);
  const [passwordToValidate, SetPasswordToValidate] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [developerMessage, setDeveloperMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDeveloperMessage(true);
    }, 2000);
    setTimeout(() => {
      setDeveloperMessage(false);
    }, 12000);
  }, []);

  const handleDataError = (message) => {
    setErrorMessage(message);
    setMessageModalVisible(true);
    setTimeout(() => {
      setMessageModalVisible(false);
    }, 3500);
  };

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .min(6, "A valid phone number, username or email address is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 8 characters"),
  });

  const onLogin = async (email, password) => {
    Keyboard.dismiss();
    try {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(
        "🔥 Firebase Login Successful ✅",
        userCredentials.user.email
      );
    } catch (error) {
      error.message ==
        "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)." &&
        handleDataError("The password is invalid, try again.");
      error.message ==
        "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)." &&
        handleDataError("Invalid email. Please verify your input.");
    }
  };

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

export default LoginForm;

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
