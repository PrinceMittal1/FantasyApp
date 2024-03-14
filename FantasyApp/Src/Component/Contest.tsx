import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from "react-native"
import { colors } from "../Assets/colors"
import { RFValue } from "react-native-responsive-fontsize"
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const Contest = ({ data, index, deletingContest, changinTimeOfContest }) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [modalForTime, setModalForTime] = useState(false);
    const [timeToChange, setTimeToChange] = useState(null);

    const handleTimeChange = (data) => {
        changinTimeOfContest(index,timeToChange, data)
        setShowTimePicker(false)
    }

    const hideTimePicker = () => {
        setShowTimePicker(false)
    }

    return (
        <>
            <View style={style.container}>
                <View>

                    <View>
                        {data?.name &&
                            <View>
                                <Text style={style?.textStyle}>{data?.name}</Text>
                            </View>
                        }
                        <View>
                            <Text style={style?.textStyle}>{data?.day}</Text>
                        </View>
                        <View>
                            <Text style={style?.textStyle}>{`${data?.startingdate}/${data?.startingmonth}/${data?.startingyear} - ${data?.startinghour}:${data?.startingtime} ${data?.startingschedule}`}</Text>
                        </View>
                        <View>
                            <Text style={style?.textStyle}>{`${data?.endingdate}/${data?.endingmonth}/${data?.endingyear} - ${data?.endinghour}:${data?.endingtime} ${data?.endingschedule}`}</Text>
                        </View>
                    </View>

                </View>

                <View style={style.buttonContainer}>
                    <View>
                        <TouchableOpacity onPress={() => deletingContest(index)} style={style?.buttonStyle}>
                            <Text style={style?.buttonTextStyle}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setModalForTime(true)} style={style?.buttonStyle}>
                            <Text style={style?.buttonTextStyle}>Change Time</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {
                showTimePicker &&
                (
                    <DateTimePickerModal
                        isVisible={showTimePicker}
                        mode="time"
                        onConfirm={handleTimeChange}
                        onCancel={hideTimePicker}
                        display='spinner'
                        minimumDate={new Date()}
                    />
                )
            }

            {modalForTime &&
                <Modal  onRequestClose={()=>{setModalForTime(false)}}  visible={modalForTime} transparent={true}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            alignItems: 'center',
                            width: SCREEN_WIDTH,
                            justifyContent: 'center'

                        }}>
                        <View
                            style={{
                                marginBottom: RFValue(20),
                                alignItems: 'center',
                                padding: RFValue(8),
                                width: SCREEN_WIDTH / 1.2,
                                borderRadius: RFValue(10),
                                backgroundColor: 'white'
                            }}>

                            <View>
                                <Text style={style.modalText}>Please select which time you want to change</Text>
                            </View>

                            <View style={style.modalbuttonContainer}>

                                <TouchableOpacity onPress={()=>(setShowTimePicker(true) ,setModalForTime(false) ,setTimeToChange("start"))} style={style.modalButton}>
                                    <Text style={style.modalButtonText}>Starting Time</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>(setShowTimePicker(true) ,setModalForTime(false) ,setTimeToChange("end"))} style={style.modalButton}>
                                    <Text style={style.modalButtonText}>Ending Time</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>
            }
        </>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: colors?.hperul,
        borderRadius: RFValue(10),
        margin: RFValue(10),
        padding: RFValue(10)
    },
    textStyle: {
        color: 'white',
        fontSize: RFValue(18)
    },
    buttonStyle: {
        backgroundColor: 'white',
        paddingVertical: RFValue(10),
        paddingHorizontal: RFValue(15),
        borderRadius: RFValue(10)
    },
    buttonTextStyle: {
        color: colors?.hperul,
        fontSize: RFValue(14)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RFValue(10)
    },
    modalText:{
        fontSize:RFValue(18),
        color:'black',
    },
    modalbuttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
        marginTop:RFValue(15),
        marginBottom:RFValue(5)
    },
    modalButton:{
        backgroundColor:colors.hperul,
        borderRadius:RFValue(15),
        paddingHorizontal:RFValue(10),
        paddingVertical:RFValue(7),
    },
    modalButtonText:{
        color:'white',
        fontSize:RFValue(18)
    }
})

export default Contest