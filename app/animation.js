import Animated, { useSharedValue, withSpring} from "react-native-reanimated";
import { StyleSheet, View, Button } from "react-native";
import { Link } from "expo-router";


export default function animation() {
    const positionY = useSharedValue(50);

    return (
        <View style={styles.container}>
            <Link href="/" style={styles.link}>Home</Link>
            <Button title="Animate !" 
            onPress={() => positionY.value = withSpring(positionY.value+100)}/>
            <Animated.View style={{
                ...styles.square,
                top:positionY
                }}></Animated.View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    },
    link: {
        padding: 25,
        marginTop: 50,
        backgroundColor: 'lightgrey',
        width: 125,
        textAlign: 'center',
    },
})