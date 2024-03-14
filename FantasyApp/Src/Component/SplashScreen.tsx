import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import { IMAGE } from "../Assets/Images"
import SvgUri from 'react-native-svg-uri';
import { RFValue } from "react-native-responsive-fontsize";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../Assets/colors";
import { useDispatch } from "react-redux";
import { PostContestAction } from "../Redux/Actions/postContestAction";


const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const SplashScreen = ({navigation} : any) => {
    const dispatch = useDispatch();

    const gettingDataFromLocalStorage = async () => {
        let data : any = await AsyncStorage.getItem('contestData')
        data = JSON.parse(data)

        if (data) {
            dispatch(PostContestAction(data))
            navigation.navigate("Home")
        }
        else {
            navigation.navigate("Home")
        }
    }

    useEffect(() => {
        gettingDataFromLocalStorage();
    })

    return (
        <View style={style.container}>

            <TouchableOpacity style={style.skipButton} onPress={()=>navigation.navigate("Home")}>
                <Text style={style.skipButtonText}>Skip</Text>
            </TouchableOpacity>

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
    skipButton :{
        backgroundColor: 'white', 
        paddingHorizontal: RFValue(15), 
        paddingVertical: RFValue(5), 
        width:RFValue(70), 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:RFValue(15),
        alignSelf:'flex-end',
        marginTop:RFValue(20),
        marginRight:RFValue(20)
    },
    skipButtonText:{
        color: colors.hperul , 
        fontSize:RFValue(20)
    },
    container: {
        flex: 1,
        backgroundColor: '#1F3876',
        borderWidth: 4
    },
    upperContainer: {
        height: SCREEN_HEIGHT / 2.5,
        backgroundColor: "#1F3876",
        justifyContent: 'center',
        flexDirection: 'row'
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