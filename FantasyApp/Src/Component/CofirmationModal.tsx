import React from "react";
import { View, Text, Modal, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../Assets/colors";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const ConfirmationModal = ({ contestLength, contestName, setConfirmationModalPopUp, savingDataToRedux } : any) => {

    return (
        <Modal onRequestClose={()=>{setConfirmationModalPopUp(false)}} visible={true} transparent={true}>
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
                    {contestLength < 1 || !contestName.length ? (
                        <Text style={{ fontSize: RFValue(15), color: 'black', alignSelf: 'flex-start' }}>Fail to proceed</Text>
                    ) :
                        <Text style={{ fontSize: RFValue(15), color: 'black', alignSelf: 'flex-start' }}>Great</Text>}

                    {!contestName ? <Text style={{ fontSize: RFValue(15), color: 'black', alignSelf: 'flex-start' }}>Please enter a name for the contest</Text>
                        :
                        contestLength < 1 ? <Text style={{ fontSize: RFValue(15), color: 'black', alignSelf: 'flex-start' }}>Please select atleast one time slot</Text>
                            :
                            <Text style={{ fontSize: RFValue(15), color: 'black', alignSelf: 'flex-start' }}>Do you want to create the contest</Text>
                    }

                    {contestLength < 1 || !contestName.length ? (
                        <TouchableOpacity style={style.okayButton} onPress={() => setConfirmationModalPopUp(false)}>
                            <Text style={style.okayButtonText}>Okay</Text>
                        </TouchableOpacity>
                    ) :
                        <TouchableOpacity style={style.okayButton} onPress={savingDataToRedux}>
                            <Text style={style.okayButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    }


                </View>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    okayButton: {
        backgroundColor: colors.hperul,
        borderRadius: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(5),
        alignSelf: 'flex-end',
        marginRight: RFValue(10),
        marginTop: RFValue(15),
        marginBottom: RFValue(5)
    },
    okayButtonText: {
        color: 'white',
        fontSize: RFValue(23),

    }
})
export default ConfirmationModal