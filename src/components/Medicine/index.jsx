import React, {useEffect, useState} from 'react';
import { Modal, SafeAreaView, Text, TouchableOpacity, View, Image } from 'react-native';
import ButtonComponent from "../Button/ButtonComponent";
import DateTimerPicker from "../DateTimerPicker/DateTimerPicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"

export default function MedicineComponent({ medicine, onReturn, newImage }) {
    const [modalTreatment, setModalTreatment] = useState(false);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [isNewTreatmentModal, setIsNewTreatmentModal] = useState(false);
    const [isModalImageOpen, setIsModalImageOpen] = useState(false)

    const handleNewAndUpdateTreatmentReturn = (date, isNewTreatment) => {
        const isoString = date.toISOString();
        setModalTreatment(false);
        setShowDateTimePicker(false);
        onReturn(medicine._id, isoString, isNewTreatment);
    };

    const formatNextDose = (nextDose) => {
        if (!nextDose) return { date: "", time: "" };
        const date = new Date(nextDose);
        const formattedDate = date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { date: formattedDate, time: formattedTime };
    };

    const { date, time } = formatNextDose(medicine.next_dose);

    const openCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes:  ImagePicker.MediaTypeOptions.All,
            aspect: [16, 9],
            quality: 0,
        });
        let image;

        if (!result.canceled) {
            image = await imageToBase64(result.assets[0].uri);
        }

        if(image){
            newImage(medicine._id, image)
        }
    }

    async function imageToBase64(imageUri){
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        if (fileInfo.exists) {
            const base64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `${base64}`;
        } else {
            throw new Error('Arquivo de imagem não encontrado');
        }
    }

    const handleImagePress = () => {
        setIsModalImageOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalImageOpen(false);
    };

    const imageSource = medicine.new_photo
        ? { uri: `data:image/jpeg;base64,${medicine.new_photo}` }
        : { uri: medicine.link_photo };

    useEffect(() => {
        const requestPermissions = async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

            if (cameraPermission.status !== "granted") {
                alert("É necessário conceder permissão para acessar a galeria e a câmera para utilizar essa funcionalidade.");
            }
        };

        requestPermissions();
    }, []);

    return (
        <SafeAreaView>
            <View style={{
                backgroundColor: "#74BDE8",
                padding: 15,
                borderRadius: 10
            }}>
                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", flexWrap: 'wrap' }}>{medicine.medicine.nome_produto}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: 'center' }}>{date}</Text>
                        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: 'center' }}>{time}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15, flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <View style={{ backgroundColor: "gray", width: 110, height: 100 }}>
                        {medicine.new_photo && (
                            <TouchableOpacity onPress={handleImagePress}>
                                <Image
                                    source={imageSource}
                                    style={{ width: 110, height: 100 }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View>
                        {medicine.dose_history.length > 0 ? (
                            <>
                                <TouchableOpacity style={{
                                    backgroundColor: '#83EACC',
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                    paddingHorizontal: 15,
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                                                  onPress={() => handleNewAndUpdateTreatmentReturn(new Date(), false)}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tomei Agora</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: '#EF6C6C',
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                    paddingHorizontal: 15,
                                    alignItems: 'center',
                                    marginTop: 10,

                                }}
                                                  onPress={() => setShowDateTimePicker(true)}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tomei Atrasado</Text>
                                </TouchableOpacity>
                                {!medicine.new_photo && (
                                    <TouchableOpacity style={{
                                        backgroundColor: '#F4F66E',
                                        borderRadius: 10,
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        alignItems: 'center',
                                        marginTop: 10,
                                    }}
                                                      onPress={openCamera}
                                    >
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Outro Remédio</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#F4F66E',
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                    paddingHorizontal: 15,
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                                onPress={() => setModalTreatment(true)}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Iniciar Tratamento</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <DateTimerPicker
                        showDatePicker={showDateTimePicker}
                        onConfirm={(dateHourModal) => {
                            handleNewAndUpdateTreatmentReturn(dateHourModal, isNewTreatmentModal);
                            setIsNewTreatmentModal(false);
                        }}
                        onCancel={() => {
                            setShowDateTimePicker(false);
                            setIsNewTreatmentModal(false);
                        }}
                        type={"datetime"}
                    />

                </View>
                <Modal animationType={"fade"} visible={modalTreatment} transparent={true} >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        <View style={{
                            width: 300,
                            height: 200,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 20,
                        }}>
                            <ButtonComponent text={"Tomei agora"} color={"red"} onPress={() => handleNewAndUpdateTreatmentReturn(new Date(), true)} />
                            <ButtonComponent text={"Tomei antes"} color={"blue"} onPress={() => {
                                setShowDateTimePicker(true);
                                setIsNewTreatmentModal(true)
                            }} />
                            <DateTimerPicker
                                showDatePicker={showDateTimePicker}
                                onConfirm={(dateHourModal) => {
                                    handleNewAndUpdateTreatmentReturn(dateHourModal, isNewTreatmentModal);
                                    setIsNewTreatmentModal(false);
                                }}
                                onCancel={() => {
                                    setShowDateTimePicker(false);
                                    setIsNewTreatmentModal(false);
                                }}
                                type={"datetime"}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isModalImageOpen}
                    transparent={true}
                    onRequestClose={handleCloseModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }} onPress={handleCloseModal}>
                            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>X</Text>
                        </TouchableOpacity>
                        <Image
                            source={imageSource}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}
