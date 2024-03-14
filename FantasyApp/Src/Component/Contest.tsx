import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from "react-native"
import { colors } from "../Assets/colors"
import { RFValue } from "react-native-responsive-fontsize"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import isTimeColliding from "../functions/dateColldingFunction";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const Contest = ({ data, index, deletingContest, changinTimeOfContest }: any) => {
    const AllContest = useSelector(state => state.allContest)
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [modalForTime, setModalForTime] = useState(false);
    const [timeToChange, setTimeToChange] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [timeSelectingModalForStarting, setTimeSelectingModalForStarting] = useState(false);
    const [timeSelectingModalForEnding, setTimeSelectingModalForEnding] = useState(false);
    const [singleContest, setSingleContest] = useState(null);

    const handleTimeChange = (data: Date) => {
        setShowTimePicker(false)
        changinTimeOfContest(index, timeToChange, data)

    }

    const hideTimePicker = () => {
        setShowTimePicker(false)
    }

    const handleTimeChangeForStarting = (date: Date) => {
        setTimeSelectingModalForStarting(false)
        setTimeSelectingModalForEnding(true);
        let singlecontest = AllContest.allContest[index];
        singlecontest.startinghour = date.getHours() % 12 < 10 ? `0${date.getHours() % 12}` : date.getHours() % 12,
            singlecontest.startingtime = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
            setSingleContest(singlecontest)
        Toast.showWithGravity(`Please select ending time for contest`,
            Toast.SHORT,
            Toast.BOTTOM
        );
    };


    const handleTimeChangeForending = async (date: Date) => {
        setTimeSelectingModalForEnding(false)
        let singlecontest = JSON.parse(JSON.stringify(singleContest));
        let newArray;
        if (singlecontest && AllContest) {
            singlecontest.endinghour = date.getHours() % 12 < 10 ? `0${date.getHours() % 12}` : date.getHours() % 12,
                singlecontest.endingtime = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

            newArray = AllContest.allContest.filter((ele, indexs) => ele !== singleContest);
        }
        else{
            Toast.showWithGravity(`Something went wrong`,
                Toast.SHORT,
                Toast.BOTTOM
            );
            return
        }

        // console.log("new array every single time is ",singleContest)
        if (isTimeColliding(singlecontest, newArray)) {
            setSingleContest(null)
            Toast.showWithGravity(`your selected time collide with existing contest`,
                Toast.SHORT,
                Toast.BOTTOM
            );
            
        }
        else {
            setSingleContest(null)
            Toast.showWithGravity(`your contest is added`,
                Toast.SHORT,
                Toast.BOTTOM
            );
        }
    };

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

                {/* deletingContest(index) */}

                <View style={style.buttonContainer}>
                    <View>
                        <TouchableOpacity onPress={() => setDeleteModal(true)} style={style?.buttonStyle}>
                            <Text style={style?.buttonTextStyle}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setTimeSelectingModalForStarting(true)} style={style?.buttonStyle}>
                            <Text style={style?.buttonTextStyle}>Change Time</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {
                showTimePicker &&
                (
                    <DateTimePickerModal
                        isVisible={true}
                        mode="time"
                        onConfirm={handleTimeChange}
                        onCancel={hideTimePicker}
                        display='spinner'
                        minimumDate={new Date()}
                    />
                )
            }

            {modalForTime &&
                <Modal onRequestClose={() => { setModalForTime(false) }} visible={modalForTime} transparent={true}>
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

                                <TouchableOpacity onPress={() => (setShowTimePicker(true), setModalForTime(false), setTimeToChange("start"))} style={style.modalButton}>
                                    <Text style={style.modalButtonText}>Starting Time</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => (setShowTimePicker(true), setModalForTime(false), setTimeToChange("end"))} style={style.modalButton}>
                                    <Text style={style.modalButtonText}>Ending Time</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>
            }

            {deleteModal &&
                <Modal onRequestClose={() => { setDeleteModal(false) }} visible={deleteModal} transparent={true}>
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
                                <Text style={style.modalText}>Are you sure you want to delete this contest</Text>
                            </View>

                            <View style={style.modalbuttonContainer}>

                                <TouchableOpacity onPress={() => setDeleteModal(false)} style={style.modalButton}>
                                    <Text style={style.modalButtonText}>No</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => (deletingContest(index), setDeleteModal(false))} style={style.modalButton}>
                                    <Text style={style.modalButtonText}>delete</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>
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
    modalText: {
        fontSize: RFValue(18),
        color: 'black',
    },
    modalbuttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: RFValue(15),
        marginBottom: RFValue(5)
    },
    modalButton: {
        backgroundColor: colors.hperul,
        borderRadius: RFValue(15),
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(7),
    },
    modalButtonText: {
        color: 'white',
        fontSize: RFValue(18)
    }
})

export default Contest