import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView, Dimensions } from "react-native"
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
import { useDispatch, useSelector } from "react-redux";
import { PostContestAction } from "../Redux/Actions/postContestAction";
import { changingTimeOfContests } from "../functions/changingTimeOfContests";
import isTimeColliding from "../functions/dateColldingFunction";
import Toast from "react-native-simple-toast";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

interface DateItem {
    day: string;
    startingdate: any;
    startingmonth: any;
    startingyear: any;
    endingdate: number;
    endingmonth: number;
    endingyear: number;
    startinghour: string | number;
    startingtime: string | number;
    endinghour: string | number;
    endingtime: string | number;
    startingschedule: string;
    endingschedule: string;
    name: String
}

const ContestCreationScreen = ({ navigation }) => {
    const AllContest = useSelector(state => state.allContest)
    const [contestName, setContestName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allContest, setAllContest] = useState<DateItem[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [confirmationModalPopUp, setConfirmationModalPopUp] = useState(false);
    const [singleContest, setSingleContest] = useState<any>(null);
    const [timeSelectingModalForStarting, setTimeSelectingModalForStarting] = useState(false);
    const [timeSelectingModalForEnding, setTimeSelectingModalForEnding] = useState(false);

    const dispatch = useDispatch();

    const handleDateChange = (date: Date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            const dateformat = dateToStringDate(date)
            setSingleContest(dateformat);
            setTimeSelectingModalForStarting(true)
            hideDatePicker();
            Toast.showWithGravity(`Please select starting time of contest`,
                Toast.SHORT,
                Toast.BOTTOM
            );
        } else {
            hideDatePicker();
        }
    };

    const handleTimeChangeForStarting = (date: Date) => {
        setTimeSelectingModalForStarting(false)
        setTimeSelectingModalForEnding(true);
        let singlecontest = { ...singleContest };
        singlecontest.startingdate = date?.getDate();
        singlecontest.startinghour = date.getHours() % 12 < 10 ? `0${date.getHours() % 12}` : date.getHours() % 12,
            singlecontest.startingtime = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
            Toast.showWithGravity(`Please select ending time for contest`,
                Toast.SHORT,
                Toast.BOTTOM
            );
        setSingleContest(singlecontest)
    };

    const handleTimeChangeForending = (date: Date) => {
        setTimeSelectingModalForEnding(false)
        let singlecontest = { ...singleContest };
        singlecontest.endingdate = date?.getDate();
        singlecontest.endinghour = date.getHours() % 12 < 10 ? `0${date.getHours() % 12}` : date.getHours() % 12,
        singlecontest.endingtime = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

        if (isTimeColliding(singlecontest, AllContest?.allContest)) {
            setSingleContest(null)
            Toast.showWithGravity(`your selected time collide with existing contest`,
                Toast.SHORT,
                Toast.BOTTOM
            );
        }
        else {
            setAllContest(sortingAllContest([...allContest, singlecontest]));
            setSingleContest(null)
            Toast.showWithGravity(`your contest is added`,
                Toast.SHORT,
                Toast.BOTTOM
            );
        }
    };

    const selectedEveryDay = () => {
        const everyDayDates: any = []
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + i);
            everyDayDates.push(dateToStringDate(newDate));
        }
        setAllContest(everyDayDates);
    };

    const deletingContest = (index: number) => {
        let newArray = allContest.filter((_, indexs) => indexs !== index);
        setAllContest(newArray)
    }

    const changinTimeOfContest = (index, timetoChange, data) => {
        const newtime = changingTimeOfContests(allContest[index], index, timetoChange, data)
        const newarray = [...allContest];
        newarray[index] = newtime;
        setAllContest(newarray);
    }

    const savingDataToRedux = () => {
        console.log("all contest from redux", [...AllContest?.allContest, ...allContest])
        allContest.forEach((obj, index) => {
            obj.name = contestName;
        });
        dispatch(PostContestAction([...AllContest?.allContest, ...allContest]))
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

                    <View style={{ height: SCREEN_HEIGHT / 2.1 }}>
                        <ScrollView>
                            {
                                allContest?.length > 0 ?
                                    allContest?.map((item, index) =>
                                        <Contest key={index} data={item} index={index} deletingContest={deletingContest} changinTimeOfContest={changinTimeOfContest} />)
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

                    {timeSelectingModalForStarting && (
                        <DateTimePickerModal
                            isVisible={true}
                            mode="time"
                            onConfirm={handleTimeChangeForStarting}
                            onCancel={() => setTimeSelectingModalForStarting(false)}
                            display='spinner'
                            minimumDate={new Date()}
                        />
                    )}

                    {timeSelectingModalForEnding && (
                        <DateTimePickerModal
                            isVisible={true}
                            mode="time"
                            onConfirm={handleTimeChangeForending}
                            onCancel={() => setTimeSelectingModalForEnding(false)}
                            display='spinner'
                            minimumDate={new Date()}
                        />
                    )}
                </View>

                <TouchableOpacity onPress={() => setConfirmationModalPopUp(true)} style={style.confirmButtonStyle}>
                    <Text style={{ fontSize: RFValue(20), color: 'white' }}>Confirm</Text>
                </TouchableOpacity>

            </View>
            {
                confirmationModalPopUp && <ConfirmationModal savingDataToRedux={savingDataToRedux} contestLength={allContest?.length} contestName={contestName} setConfirmationModalPopUp={setConfirmationModalPopUp} />
            }
        </>
    )
}

const style = StyleSheet.create({
    confirmButtonStyle: {
        width: SCREEN_WIDTH,
        backgroundColor: colors.hperul,
        justifyContent: 'center',
        alignItems: 'center',
        height: RFValue(50),
        position: 'absolute', bottom: 0
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