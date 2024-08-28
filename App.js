import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoginForm from "./src/components/login/LoginForm";

const LoginScreen = ({ navigation }) => {
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMessageModalVisible(true);
    }, 500);
    setTimeout(() => {
      setMessageModalVisible(false);
    }, 3500);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.logoContainer}>
            <View>
               <View style={styles.logoContainer}>
      <Image
        source={require('./assets/images/header-logo.png')}
        style={styles.logo}
      />
    </View> 

              <LoginForm navigation={navigation} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View>
      
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    alignContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: Platform.OS === "android" ? 70 : 60,
    width: 200,
    resizeMode: "cover",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: Platform.OS === "android" ? 70 : 50,
    paddingBottom: Platform.OS === "android" ? 5 : 0,
  },
  signUpText: {
    color: "#bbb",
  },
  signUpBtn: {
    color: "#1af",
    fontWeight: "700",
  }
});
