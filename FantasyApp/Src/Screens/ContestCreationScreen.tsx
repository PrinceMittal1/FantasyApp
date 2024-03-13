import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native"
import UpperContainer from "../Component/UpperContainer"
import { RFValue } from "react-native-responsive-fontsize"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from "../Assets/colors";
import { dateToStringDate } from "../functions/dateToStringDate";

const todayDate = new Date();

const ContestCreationScreen = () => {
    const [contestName, setContestName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateInString, setDateInString] = useState(dateToStringDate(selectedDate));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            setDateInString(dateToStringDate(date))
            setShowDatePicker(false);
        } else {
            setShowDatePicker(false);
        }
    };

    return (
        <View style={style.container}>


            <UpperContainer />

            {/* <View> */}

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

                        <TouchableOpacity style={style.dateSelectionButton} onPress={() => setShowDatePicker(true)}>
                            <View>
                                <Text style={{ color: 'white', fontSize: RFValue(20) }}>Select Date</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.dateSelectionButton} onPress={() => setDateInString("Every Day")}>
                            <View>
                                <Text style={{ color: 'white', fontSize: RFValue(20) }}>Every Day</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View>
                        <Text style={style.contestNameText}>{dateInString}</Text>
                    </View>

                    {showDatePicker &&
                        (
                            <DateTimePicker
                                value={selectedDate}
                                mode="time"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )
                    }

                </View>
            {/* </View> */}
        </View>
    )
}

const style = StyleSheet.create({
    contestInputStyle: {
        color: "black",
        fontSize: RFValue(14.5),
        textAlign: 'left',
        borderWidth: 1,
        paddingHorizontal: RFValue(13),
        borderRadius: RFValue(4)
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