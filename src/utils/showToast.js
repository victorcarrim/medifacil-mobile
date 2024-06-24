import Toast from 'react-native-toast-message';

const showToast = (type, text1, text2) => {
    Toast.show({
        type: type, // 'success', 'error', 'info'
        text1: text1,
        text2: text2,
    });
};

export default showToast;
