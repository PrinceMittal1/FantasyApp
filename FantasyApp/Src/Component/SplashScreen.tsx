import { Text, View, Image, Dimensions, StyleSheet } from "react-native"
import { IMAGE } from "../Assets/Images"
import SvgUri from 'react-native-svg-uri';
import { RFValue } from "react-native-responsive-fontsize";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const SplashScreen = () => {

    const gettingDataFromLocalStorage = async () => {
        const data = await AsyncStorage.getItem('joinedContest')

        if(data){

        }
        else{
            
        }
    }

    useEffect(() => {
        gettingDataFromLocalStorage();
    })

    return (
        <View style={style.container}>

            <View style={style.upperContainer}>

                <View>
                    <Text style={style.welcomeText}>Welcome to TFG</Text>
                </View>

            </View>

            <View>
                <Image style={style.imageDeepak} source={IMAGE.deepakChaharImage} />
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F3876',
        borderWidth: 4
    },
    upperContainer: {
        height: SCREEN_HEIGHT / 2.5,
        backgroundColor: "#1F3876",
        flexDirection: "row",
        justifyContent: 'center'
    },
    welcomeText: {
        color: 'white',
        fontSize: RFValue(40),
        marginTop: RFValue(50)
    },
    imageDeepak: {
        width: SCREEN_WIDTH / 1,
        height: SCREEN_HEIGHT / 1.5,
        marginTop: RFValue(-130)
    }
});

export default SplashScreen