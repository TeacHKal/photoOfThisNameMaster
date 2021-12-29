import React from "react";

import {createStackNavigator} from '@react-navigation/stack';
import Home from "../component/Home";
import ContactListPicker from "../component/ContactListPicker";
import PhotoDataList from "../component/PhotoDataList";
import TestComponent from "../component/TestComponent";


export const ROUTES = {
    HOME: "Home",
    CONTACT_LIST_PICKER: "Contact Picker",
    PHOTO_DATA_LIST: "Photos",
    TEST_COMPONENT: "testComponent",
}

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.HOME} component={Home}/>
            <Stack.Screen name={ROUTES.CONTACT_LIST_PICKER} component={ContactListPicker}/>
            <Stack.Screen name={ROUTES.PHOTO_DATA_LIST} component={PhotoDataList}/>
            <Stack.Screen name={ROUTES.TEST_COMPONENT} component={TestComponent}/>
        </Stack.Navigator>
    );
}

export default HomeStack;