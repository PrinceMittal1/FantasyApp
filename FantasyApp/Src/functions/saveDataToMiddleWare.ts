import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST_All_CONTEST_SUCCESS } from '../Redux/types';

// Middleware function
const saveDataMiddleware = store => next => action => {

    next(action);

    switch (action.type) {
        case POST_All_CONTEST_SUCCESS:
            saveDataToStorage(action.payload);
            break;
        default:
            break;
    }
};

// function to save data to AsyncStorage
const saveDataToStorage = async (data) => {
    // console.log("saved data", data)
    try {
        let saveddata = await AsyncStorage.setItem('contestData', JSON.stringify(data));
        
    } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
    }
}

export default saveDataMiddleware;
