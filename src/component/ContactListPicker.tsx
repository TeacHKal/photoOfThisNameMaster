import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity, Button
} from "react-native";

import * as Contacts from 'expo-contacts';
import language from "../shared/language";
import {COLORS} from "../shared/colors";

interface IProps {
    onListItemClick: (item: any) => void,
    history?: any,
    onBtnClick?: () => void,
    buttonName?: string
}

const ContactListPicker: React.FC<IProps> = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [inMemoryContacts, setInMemoryContacts] = useState([])

    const { strings } = language;

    useEffect(() => onComponentMount(), []);

    const onComponentMount = () => {
        setIsLoading(true);
        loadContacts().then();
    }

    const searchContacts = value => {
        const filteredContacts = inMemoryContacts.filter(contact => {
            let contactLowercase = (
                contact.firstName +
                ' ' +
                contact.lastName
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return contactLowercase.indexOf(searchTermLowercase) > -1;
        });
        setContacts(filteredContacts);
    };

    const loadContacts = async () => {

        const { status } = await Contacts.requestPermissionsAsync();


        if (status !== 'granted') {
            return;
        }

        const {data} = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
        });

        setContacts(data);
        setInMemoryContacts(data);
        setIsLoading(false);
    };

    const handleRenderItemPress = (item) => {
        props.onListItemClick(item);
    }



    const renderTextInput = () => {
        return (
            <TextInput
                placeholder={strings.SEARCH}
                placeholderTextColor="#dddddd"
                style={styles.input}
                onChangeText={value => searchContacts(value)}
            />
        );
    }

    const getColor = (num: number) => {
        return (num % 2 ) ? styles.listItemColorOdd : styles.listItemColorEven;
    }

    const renderItem = ({item, index}) => (
        <TouchableOpacity onPress={() => handleRenderItemPress(item)}>
            <View style={[styles.renderItemContainer, getColor(index)]}>
                <Text style={styles.renderItemNameText}>
                    {item.firstName + ' '}
                    {item.lastName}
                </Text>
                <Text style={styles.renderItemNumberText}>
                    {item.phoneNumbers ? item.phoneNumbers[0].number : ""}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderFlatList = () => {
        return (
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View style={styles.flatList}>
                        <Text style={styles.flatListText}>{strings.NO_CONTACTS_FOUND}</Text>
                    </View>
                )}
            />
        )
    }

    const renderLoader = () => {
        return (
            <View>
                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#bad555"/>
                    </View>
                ) : null}
            </View>)
    }

    const handleGoHome = () => {
        props.onBtnClick();
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                {renderTextInput()}
                {renderLoader()}
                {renderFlatList()}
                {props.buttonName ? <Button title={props.buttonName} onPress={() => handleGoHome()}/> : null}
            </SafeAreaView>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        //alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 25
    },
    input: {
        backgroundColor: COLORS.outerSpace,
        height: 50,
        fontSize: 25,
        padding: 10,
        color: COLORS.white,
        borderBottomWidth: 0.5,
        borderBottomColor: '#7d90a0',
        borderRadius: 8,
        width: 280
    },
    button: {
        margin: 5
    },
    flatList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    flatListText: {
        color: COLORS.conifer,
    },
    renderItemContainer: {
        marginBottom: 8,
        marginTop: 15,
        paddingHorizontal: 10,
        flex: 1,
        borderRadius: 8,

    },
    renderItemNameText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 20
    },
    listItemColorOdd: {
        backgroundColor: COLORS.gullStream,
    },
    listItemColorEven: {
        backgroundColor: COLORS.gullGray,
    },
    renderItemNumberText: {
        color: COLORS.white,
        fontWeight: 'bold'
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ContactListPicker;