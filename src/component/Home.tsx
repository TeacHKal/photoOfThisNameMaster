import React, {useEffect, useState} from "react";
import {View, StyleSheet, Button, Text, Modal, SafeAreaView, TextInput, Alert} from "react-native";
import language from "../shared/language";
import ContactListPicker from "./ContactListPicker";
import {ROUTES} from "../routes/homeStack";
import {COLORS} from "../shared/colors";

interface IProps {
    navigation: any
}

const Home: React.FC<IProps> = (props) => {
    const [isNameModalShown, setIsNameModalShown] = useState(false);
    const [isContactListPickerShown, setIsContactListPickerShown] = useState(false);
    const [nameOfPhoto, setNameOfPhoto] = useState("");
    const {strings} = language;

    const handlePickContact = () => {
        setIsContactListPickerShown(true);
    }

    const handleSearch = () => {
        setIsNameModalShown(true);
    }

    const handleBtnCloseModal = () => {
        setIsNameModalShown(false);
    }

    const renderContactPickerModal = () => {
        return (
            <View>
                <SafeAreaView>
                    <Modal visible={isNameModalShown}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalData}>
                                <Text style={styles.title}>{strings.TYPE_PHOTO_NAME}</Text>
                                <TextInput
                                    placeholder={strings.TYPE_A_NAME}
                                    placeholderTextColor="#dddddd"
                                    style={styles.input}
                                    onChangeText={value => setNameOfPhoto(value)}
                                />
                            </View>
                            <Button title={strings.SELECT} onPress={handleBtnCloseModal}/>
                        </View>
                    </Modal>
                </SafeAreaView>
            </View>
        );
    }

    const handleContactListPickerItemClick = (item) => {
        setNameOfPhoto(item.firstName);
        setIsContactListPickerShown(false);
    }

    const handleContactListBtnClick = () => {
        setIsContactListPickerShown(false);
    }

    const renderContactListPicker = () => {
        return(
            <ContactListPicker
                onListItemClick={(item) => handleContactListPickerItemClick(item)}
                onBtnClick={() => handleContactListBtnClick()}
                buttonName={strings.GO_HOME}
            />
        )
    }

    const renderInputBtn = () => {
        return(
            <View style={styles.button}>
                <Button
                    title={strings.SEARCH}
                    onPress={handleSearch}
                />
            </View>
        )
    }

    const enterNamePopUp = () => {
        Alert.alert("Please enter a name");
    }
    const handleSearchForPhoto = () => {
        if(nameOfPhoto === null || nameOfPhoto.match(/^ *$/) !== null) {
            enterNamePopUp();
            return;
        }

        props.navigation.navigate(ROUTES.PHOTO_DATA_LIST, {photoName: nameOfPhoto});
    }

    const renderMainView = () => {
        return (<View>
                {renderContactPickerModal()}
                {renderInputBtn()}

                <View style={styles.button}>
                    <Button
                        title={strings.PICK_A_CONTACT}
                        onPress={handlePickContact}
                    />
                </View>
                <Text style={styles.photoName}>{strings.NAME}: {nameOfPhoto}</Text>
                <Button title={strings.SEARCH_FOR_PHOTOS} onPress={handleSearchForPhoto}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {isContactListPickerShown ?
                renderContactListPicker()
                : renderMainView()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        margin: 5
    },
    input: {
        backgroundColor: COLORS.outerSpace,
        height: 50,
        fontSize: 20,
        padding: 10,
        color: COLORS.white,
        borderBottomWidth: 0.5,
        borderBottomColor: '#7d90a0',
        marginTop: 10,
        marginBottom: 10,
        width: 230,
        borderRadius: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
    },
    modalData: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    photoName: {
        fontSize: 30,
        paddingTop: 10,
        paddingBottom: 10,
        color: COLORS.black,
    },
    title: {
        fontSize: 20,
    }
});

export default Home;