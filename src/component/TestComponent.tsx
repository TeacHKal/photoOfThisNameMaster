import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import {COLORS} from "../shared/colors";

interface IProps{}

const TestComponent: React.FC<IProps> = () => {
    const handleOnPress = () => {
        console.log("test component btn press")
    }

    return(
        <View style={styles.container}>
            <Text>This is a test component</Text>
            <Button title={"home"} onPress={handleOnPress}/>
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

})
export default TestComponent;