import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoginForm from "./src/components/login/LoginForm";
import FastImage from "react-native-fast-image";

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
          <View style={styles.mainContainer}>
            <View>
              <Animated.View style={styles.logoContainer}>
                <FastImage
                  source={require("../../assets/images/header-logo.png")}
                  style={styles.logo}
                />
              </Animated.View>

              <LoginForm navigation={navigation} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View>
      <Divider width={0.5} color="#333" />
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
});
