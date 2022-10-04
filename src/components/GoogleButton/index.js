import CustomButton from '../CustomButton';
import {useEffect} from 'react';

const GoogleButton = ({onPress}) => {

    return (
        <>
            <CustomButton 
                text="Sign In with Google"
                onPress={onPress}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
        </>
    );
};

export default GoogleButton;