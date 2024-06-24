import React from 'react';
import { View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DateTimerPicker({ showDatePicker, onConfirm, onCancel, type }) {
    return (
        <View>
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode={type}
                onConfirm={onConfirm}
                onCancel={onCancel}
                textColor="black"
                pickerContainerStyleIOS={{
                    backgroundColor: 'white',
                }}
                locale="pt-BR"
            />
        </View>
    );
}
