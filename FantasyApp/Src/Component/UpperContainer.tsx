import { View, Text, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"


const UpperContainer = () => {
    return (
        <View style={style.upperContainer}>
            <View>
                <Text style={style.logotext}>TFG</Text>
            </View>
        </View>)
}

const style = StyleSheet.create({
    upperContainer: {
        backgroundColor: "#1F3876",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: RFValue(20)
    },
    logotext: {
        color: 'white',
        fontSize: RFValue(30),
    }
})

export default UpperContainer
