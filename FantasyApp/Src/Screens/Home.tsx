import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { IMAGE } from "../Assets/Images"
import UpperContainer from "../Component/UpperContainer";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const Home = ({navigation}) => {

    return (
    <View style={style.container}>

        {/* upper container used in every screen */}
        <UpperContainer />

        <TouchableOpacity onPress={()=>{navigation.navigate("ContestCreation")}} style={style.contestCreationContainer}>

            <View style={{alignItems:'center', justifyContent:'center',width: '80%', flexWrap: 'wrap',}}>
                <Text style={{fontSize:RFValue(30), color:'white', textAlign: 'center'}}>Create your own contest</Text>
            </View>

            <View style={{}}>
               <Image style={style.imageDeepak} source={IMAGE.deepakChaharImage} />  
            </View>
        </TouchableOpacity>

    </View>
    )
}

const style = StyleSheet.create({
    imageDeepak:{
        width: RFValue(100),
        height: RFValue(100),
    },
    contestCreationContainer :{
        backgroundColor:'#1F3876',
        margin:RFValue(10), 
        borderWidth:RFValue(1),
        flexDirection:'row',
        justifyContent:'space-around',
        paddingHorizontal:RFValue(16),
        borderRadius:RFValue(10)
    },
    container:{
        flex:1,
        backgroundColor : "white"
    },
    upperContainer : {
        backgroundColor : "#1F3876",
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:RFValue(20)
    },
    logotext : {
        color:'white',
        fontSize:RFValue(30),
    }
})

export default Home
