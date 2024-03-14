import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView, Dimensions} from "react-native"
import UpperContainer from "../Component/UpperContainer"
import { RFValue } from "react-native-responsive-fontsize"
import { useEffect, useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from "../Assets/colors";
import { dateToStringDate } from "../functions/dateToStringDate";
import Contest from "../Component/Contest";
import sortingAllContest from "../functions/sortingAllContest";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ConfirmationModal from "../Component/CofirmationModal";
import { useDispatch } from "react-redux";
import { PostContestAction } from "../Redux/Actions/postContestAction";
import { changingTimeOfContests } from "../functions/changingTimeOfContests";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const ContestCreationScreen = ({navigation}) => {
    const [contestName, setContestName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allContest, setAllContest] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [confirmationModalPopUp, setConfirmationModalPopUp] = useState(false);

    const dispatch = useDispatch();

    const handleDateChange = (date: Date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            const dateformat = dateToStringDate(date)
            setAllContest(sortingAllContest([...allContest, dateformat]));
            hideDatePicker();
        } else {
            hideDatePicker();
        }
    };

    const selectedEveryDay = () => {
        const everyDayDates = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + i);
            everyDayDates.push(dateToStringDate(newDate));
        }
        setAllContest(everyDayDates);
    };

    const deletingContest = (index : number) => {
        let newArray = allContest.filter((_, indexs) => indexs !== index);
        setAllContest(newArray)
    }

    const changinTimeOfContest = (index,timetoChange,data) => {
        const newtime = changingTimeOfContests(allContest[index], index, timetoChange, data)
        const newarray = [...allContest];
        newarray[index] = newtime;
        setAllContest(newarray);
    }

    const savingDataToRedux = () =>{
        allContest.forEach((obj, index) => {
            obj.name = contestName;
        });
        dispatch(PostContestAction(allContest))
        setConfirmationModalPopUp(false)
        navigation.navigate("Home")
    }

    useEffect(() => {
        return () => {
            setShowDatePicker(false);
        };
    }, []);
    const toggleDatePicker = () => {
        setShowDatePicker(true);
    };

    const hideDatePicker = () => {
        setShowDatePicker(false);
    };

    

    return (
        <>
        <View style={style.container}>

            <UpperContainer />

            <View style={{ marginHorizontal: RFValue(20) }}>

                <View>
                    <Text style={style.contestNameText}>Please add name of the contest</Text>

                    <TextInput
                        style={style?.contestInputStyle}
                        value={contestName}
                        maxLength={14}
                        onChangeText={(t) => setContestName(t)}
                        placeholder="Name of the contest"
                        placeholderTextColor={"black"}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                    />
                </View>

                <View>
                    <Text style={style.contestNameText}>Please Select Date for Contest</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                    <TouchableOpacity style={style.dateSelectionButton} onPress={toggleDatePicker}>
                        <View>
                            <Text style={style.selectDateButton}>Add Contest</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.dateSelectionButton} onPress={selectedEveryDay}>
                        <View>
                            <Text style={style.selectDateButton}>Every Day</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{height:SCREEN_HEIGHT/2.1}}>
                    <ScrollView>
                        {
                            allContest?.length > 0 ?
                                allContest?.map((item, index) =>
                                    <Contest key={index} data={item} index={index} deletingContest={deletingContest} changinTimeOfContest={changinTimeOfContest}/>)
                                :
                                null
                        }
                    </ScrollView>
                </View>

                {showDatePicker &&
                    (
                        <DateTimePickerModal
                            isVisible={showDatePicker}
                            mode="date"
                            onConfirm={handleDateChange}
                            onCancel={hideDatePicker}
                            display='spinner'
                            minimumDate={new Date()}
                            date={selectedDate}
                        />
                    )
                }
            </View>

            <TouchableOpacity onPress={()=>setConfirmationModalPopUp(true)} style={style.confirmButtonStyle}>
                  <Text style={{fontSize:RFValue(20), color:'white'}}>Confirm</Text>
            </TouchableOpacity>

        </View>
        {
            confirmationModalPopUp && <ConfirmationModal savingDataToRedux={savingDataToRedux} contestLength = {allContest?.length} contestName={contestName} setConfirmationModalPopUp={setConfirmationModalPopUp}/>
        }
        </>
    )
}

const style = StyleSheet.create({
    confirmButtonStyle:{
        width:SCREEN_WIDTH, 
        backgroundColor:colors.hperul, 
        justifyContent:'center', 
        alignItems:'center', 
        height:RFValue(50), 
        position:'absolute', bottom:0
    },
    contestInputStyle: {
        color: "black",
        fontSize: RFValue(14.5),
        textAlign: 'left',
        borderWidth: 1,
        paddingHorizontal: RFValue(13),
        borderRadius: RFValue(4)
    },
    selectDateButton: {
        color: 'white',
        fontSize: RFValue(20)
    },
    dateSelectionButton: {
        height: RFValue(50),
        width: RFValue(150),
        borderRadius: RFValue(15),
        backgroundColor: colors.hperul,
        alignItems: 'center',
        justifyContent: 'center',

    },
    contestNameText: {
        color: 'black',
        marginBottom: RFValue(15),
        marginTop: RFValue(20),
        fontSize: RFValue(18)
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})
export default ContestCreationScreen