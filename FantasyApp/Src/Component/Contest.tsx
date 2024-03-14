import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, TextInput } from "react-native"
import { colors } from "../Assets/colors"
import { RFValue } from "react-native-responsive-fontsize"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import isTimeColliding from "../functions/dateColldingFunction";
import { PostContestAction } from "../Redux/Actions/postContestAction";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const Contest = ({ data, index, deletingContest, changinTimeOfContest }: any) => {
    const AllContest = useSelector(state => state.allContest)
    const [deleteModal, setDeleteModal] = useState(false);
    const [modalForTimeChange, setModalForTimeChange] = useState(false);
    const [contestName, setContestName] = useState("");

    const dispatch = useDispatch();


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

                    <TouchableOpacity onPress={() => setDeleteModal(true)} style={style?.buttonStyle}>
                        <Text style={style?.buttonTextStyle}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalForTimeChange(true)} style={style?.buttonStyle}>
                        <Text style={style?.buttonTextStyle}>change Name</Text>
                    </TouchableOpacity>

                </View>
            </View>

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

            {modalForTimeChange &&
                <Modal onRequestClose={() => { setModalForTimeChange(false) }} visible={modalForTimeChange} transparent={true}>
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
                                <Text style={style.modalText}>Are you sure you want to change the name of the contest</Text>
                            </View>

                            <TextInput
                                style={style?.contestInputStyle}
                                value={contestName}
                                maxLength={14}
                                onChangeText={(t) => setContestName(t)}
                                placeholder="New Name of the contest"
                                placeholderTextColor={"black"}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />

                            <View style={style.modalbuttonContainer}>

                                <TouchableOpacity onPress={() => {
                                    if (contestName.length > 0) {
                                        let newarray = AllContest?.allContest
                                        newarray[index].name = contestName
                                        dispatch(PostContestAction(newarray))
                                        setModalForTimeChange(false)
                                    }
                                    else {

                                    }
                                }} style={style.modalButton}>
                                    <Text style={style.modalButtonText}>Confrim</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal >
            }
        </>
    )
}

const style = StyleSheet.create({
    contestInputStyle: {
        color: "black",
        fontSize: RFValue(14.5),
        textAlign: 'left',
        borderWidth: 1,
        paddingHorizontal: RFValue(13),
        borderRadius: RFValue(4),
        marginTop: RFValue(20),
        marginBottom: RFValue(10)
    },
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