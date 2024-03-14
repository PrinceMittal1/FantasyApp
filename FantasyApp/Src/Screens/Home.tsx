import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { IMAGE } from "../Assets/Images"
import UpperContainer from "../Component/UpperContainer";
import { useDispatch, useSelector } from "react-redux";
import Contest from "../Component/Contest";
import { PostContestAction } from "../Redux/Actions/postContestAction";
import { changingTimeOfContests } from "../functions/changingTimeOfContests";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const Home = ({ navigation }: any) => {
    const AllContest = useSelector(state=> state.allContest)
    const [allContest, setAllContest] = useState(AllContest?.allContest);

    const dispatch = useDispatch();

    const deletingContest = (index : number) => {
        let newArray = allContest.filter((_:any, indexs:number) => indexs !== index);
        setAllContest(newArray)
        dispatch(PostContestAction(newArray))
    }

    const changinTimeOfContest = (index:number,timetoChange:string,data:any) => {
        const newtime = changingTimeOfContests(allContest[index], index, timetoChange, data)
        const newarray = [...allContest];
        newarray[index] = newtime;
        setAllContest(newarray);
        dispatch(PostContestAction(newarray))
    }

    useEffect(()=>{
        setAllContest(AllContest?.allContest)
    },[AllContest])


    return (
        <View style={style.container}>

            {/* upper container used in every screen */}
            <UpperContainer />

            <TouchableOpacity onPress={() => { navigation.navigate("ContestCreation") }} style={style.contestCreationContainer}>

                <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', flexWrap: 'wrap', }}>
                    <Text style={{ fontSize: RFValue(30), color: 'white', textAlign: 'center' }}>Create your own contest</Text>
                </View>

                <View style={{}}>
                    <Image style={style.imageDeepak} source={IMAGE.deepakChaharImage} />
                </View>
            </TouchableOpacity>

            <View style={{ height: SCREEN_HEIGHT/ 1.55}}>
                <ScrollView>
                    {
                        allContest?.length > 0 ?
                           allContest?.map((item:any, index:number) =>
                                <Contest key={index} data={item} index={index} deletingContest={deletingContest} changinTimeOfContest={changinTimeOfContest}/>)
                            :
                            null
                    }
                </ScrollView>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    imageDeepak: {
        width: RFValue(100),
        height: RFValue(100),
    },
    contestCreationContainer: {
        backgroundColor: '#1F3876',
        margin: RFValue(10),
        borderWidth: RFValue(1),
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: RFValue(16),
        borderRadius: RFValue(10)
    },
    container: {
        flex: 1,
        backgroundColor: "white"
    },
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

export default Home
