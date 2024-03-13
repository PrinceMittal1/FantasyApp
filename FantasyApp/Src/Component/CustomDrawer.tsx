import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions,
    ScrollView,
    Platform
  } from 'react-native';
  
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  
  const CustomDrawer = ({ navigation, route }: any) => {
  
    return (
      <>
        <View style={{ flex: 0.9 }}>
          <ScrollView
          showsVerticalScrollIndicator={false} bounces={false}>
            <TouchableOpacity>
                <Text>create contest</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
      </>
    );
  };
  
  const Styles = StyleSheet.create({
  
  });
  
  export default CustomDrawer;