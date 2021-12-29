import React from 'react';
import {Provider} from "react-redux";
import Navigator from './src/routes/homeStack';
import store from "./src/store";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigator/>
            </NavigationContainer>
        </Provider>
    );
};
