import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { colors } from "../Assets/colors"
import { RFValue } from "react-native-responsive-fontsize"

const Contest = ({data, index, deletingContest}) => {
    const [showTimePicker, setShowTimePicker] = useState(false);

    return (
        <>
            <View style={{ backgroundColor: colors?.hperul, borderRadius: RFValue(10), margin: RFValue(10), padding: RFValue(10) }}>
                <View>

                    <View>
                        <View>
                            <Text style={{ color: 'white', fontSize: RFValue(18) }}>{data?.day}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: RFValue(18) }}>{`${data?.startingdate}/${data?.startingmonth}/${data?.startingyear} - ${data?.startinghour}:${data?.startingtime} ${data?.startingschedule}`}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: RFValue(18) }}>{`${data?.endingdate}/${data?.endingmonth}/${data?.endingyear} - ${data?.endinghour}:${data?.endingtime} ${data?.endingschedule}`}</Text>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: RFValue(10) }}>
                    <View>
                        <TouchableOpacity onPress={() => deletingContest(index)} style={{ backgroundColor: 'white', paddingVertical: RFValue(10), paddingHorizontal: RFValue(15), borderRadius: RFValue(10) }}>
                            <Text style={{ color: colors?.hperul, fontSize: RFValue(14) }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => console.log("changin time right now")} style={{ backgroundColor: 'white', paddingVertical: RFValue(10), paddingHorizontal: RFValue(15), borderRadius: RFValue(10) }}>
                            <Text style={{ color: colors?.hperul, fontSize: RFValue(14) }}>Change Time</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {
                showTimePicker &&
                (
                    <DateTimePicker
                        value={selectedTime}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                    />
                )
            }
        </>
    )
}

export default Contest