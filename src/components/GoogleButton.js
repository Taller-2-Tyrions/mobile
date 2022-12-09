import CustomButton from "./CustomButton";

const GoogleButton = ({ onPress }) => {
  return (
    <>
      <CustomButton
        text="Iniciar sesión con Google"
        onPress={onPress}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
    </>
  );
};

export default GoogleButton;
