import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import useUser from "../useUser";
import useAuthGoogle from "../useAuthGoogle";

const LoginHome = () => {
  const [screen, setScreen] = useState(null);
  const { login, register, user, passwordRecovery } = useUser();
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuthGoogle();
  const [mail, setMail] = useState(null);

  const onLogin = (data) => {
    setLoading(true);
    login(data, setError);
  };

  const onRegister = (data) => {
    setLoading(true);
    register(data, setError);
  };

  useEffect(() => {
    if (loading && error) {
      if (screen === "Register") {
        if (error.response.status >= 500) {
          setScreen("Login");
        }
      }
    }
  }, [loading, error, screen]);

  const goBack = () => {
    setError(null);
    setScreen(null);
  };

  const pwdRecovery = () => {
    setScreen("Recovery");
  };

  const onPress = () => {
    passwordRecovery(mail);
    goBack();
  };

  const signInGoogle = async () => {
    await signInWithGoogle();
  };

  useEffect(() => {
    if (!user) return;

    if (user.accessToken && !user.formComplete) {
      setLoading(false);
      setScreen(null);
      navigation.navigate("PassengerForm");
    } else if (user.accessToken && user.formComplete) {
      setLoading(false);
      setScreen(null);
      navigation.navigate("Home");
    }
  }, [user]);

  if (!screen)
    return <Options setScreen={setScreen} signInWithGoogle={signInGoogle} />;
  else if (screen === "Login")
    return (
      <Login
        onPress={onLogin}
        goBack={goBack}
        error={error}
        pwdRecovery={pwdRecovery}
      />
    );
  else if (screen === "Recovery")
    return <Recovery onPress={onPress} setMail={setMail} mail={mail} />;
  else return <Register onPress={onRegister} goBack={goBack} error={error} />;
};

const Options = ({ setScreen, signInWithGoogle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>FIUBER</Text>
      <View style={styles.middleContainer}>
        <TouchableOpacity
          onPress={() => setScreen("Login")}
          style={{ ...styles.button, backgroundColor: "#1495ff" }}
        >
          <Text style={styles.textButton}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={{ ...styles.button, borderWidth: 2, borderColor: "gray" }}
        >
          <AntDesign name="google" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("Register")}
          style={{ ...styles.button, backgroundColor: "black" }}
        >
          <Text style={styles.textButton}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Login = ({ onPress, error, goBack, pwdRecovery }) => {
  const { control, handleSubmit } = useForm();
  return (
    <View style={styles.container}>
      <Title goBack={goBack} text={"Iniciar sesión"} />
      <View style={styles.infoContainer}>
        {error && (
          <Text style={{ fontFamily: "uber1", color: "#ff7573" }}>
            Usuario y/o contraseña incorrectos
          </Text>
        )}
        <CustomInput
          name="email"
          placeholder="Ingresá tu mail"
          control={control}
          rules={{ required: "(*) Campo obligatorio" }}
        />
        <CustomInput
          name="password"
          placeholder="Ingresá tu contraseña"
          control={control}
          rules={{
            required: "(*) Campo obligatorio",
          }}
          secureTextEntry
        />
        <TouchableOpacity style={{ marginTop: 15 }} onPress={pwdRecovery}>
          <Text style={{ fontFamily: "uber2", fontSize: 17 }}>
            Recuperar contraseña
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleSubmit(onPress)}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={60}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Recovery = ({ onPress, mail, setMail }) => {
  return (
    <View
      style={[
        tw`h-full w-full bg-gray-400`,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={styles.recoveryContainer}>
        <Text style={styles.textStyle}>
          Se enviará un mail a tu casilla de correo.
        </Text>
        <TextInput
          placeholder="Mail"
          value={mail}
          onChangeText={setMail}
          style={{
            fontFamily: "uber2",
            fontSize: 20,
            borderBottomColor: "black",
            borderBottomWidth: 2,
            height: "10%",
            width: "70%",
          }}
        />
        <TouchableOpacity onPress={onPress}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={50}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Register = ({ goBack, onPress, error }) => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  return (
    <View style={styles.container}>
      <Title goBack={goBack} text={"Crear cuenta"} />
      <View style={styles.infoContainer}>
        {error?.response?.data?.detail?.message.includes("EMAIL_EXISTS") && (
          <Text style={{ fontFamily: "uber1", color: "#ff7573" }}>
            El usuario ya existe
          </Text>
        )}
        {error?.response?.data?.detail?.message.includes("Malformed email") && (
          <Text style={{ fontFamily: "uber1", color: "#ff7573" }}>
            No ingresaste un mail válido
          </Text>
        )}
        <CustomInput
          name="email"
          placeholder="Ingresá tu mail"
          control={control}
          rules={{ required: "(*) Campo obligatorio" }}
        />
        <CustomInput
          name="password"
          placeholder="Ingresá tu contraseña"
          control={control}
          rules={{
            required: "(*) Campo obligatorio",
          }}
          secureTextEntry
        />
        <CustomInput
          name="password-repeat"
          placeholder="Repetí la contraseña"
          control={control}
          rules={{
            validate: (value) =>
              value === pwd ? true : "Las contraseñas no coinciden",
          }}
          secureTextEntry
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleSubmit(onPress)}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={60}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Title = ({ goBack, text }) => {
  return (
    <View style={tw`flex-row`}>
      <View style={{ width: "20%", justifyContent: "center" }}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "80%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.titleText}>{text}</Text>
      </View>
    </View>
  );
};

export const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  containerStyle,
  textStyle,
  rules = {},
  defaultValue = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              containerStyle ? containerStyle : customInputStyles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value}
              defaultValue={defaultValue}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={textStyle ? textStyle : customInputStyles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default LoginHome;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    marginTop: 4,
  },
  titleText: {
    fontFamily: "uber1",
    fontSize: 40,
  },
  middleContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    borderRadius: 50,
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  textButton: {
    fontSize: 24,
    color: "white",
    fontFamily: "uber1",
  },
  infoContainer: {
    marginTop: 10,
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  recoveryContainer: {
    height: "60%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  textStyle: {
    fontFamily: "uber1",
    fontSize: 24,
  },
  textStyle2: {
    fontFamily: "uber2",
    fontSize: 18,
  },
});

const customInputStyles = StyleSheet.create({
  container: {
    borderColor: "gray",
    borderWidth: 2,
    height: 55,
    width: "80%",
    borderRadius: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginVertical: 20,
  },
  input: {
    fontFamily: "uber2",
    fontSize: 20,
  },
});
