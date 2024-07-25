import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming,  Easing} from "react-native-reanimated";
import { StyleSheet, View, Button } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";


const duration = 2000;
export default function game({ }) {
    let width = 250;//pensez a définir la taille de l'écran
    // const defaultAnim = useSharedValue(width / 2 - 160);animation effet rebondi
    const linear = useSharedValue(width / 2 - 160);
    const positionY = useSharedValue(0);

    const animatedDefault = useAnimatedStyle(() => ({
        transform: [{translateY: positionY.value}],
      }));

    const animatedChanged = useAnimatedStyle(() => ({
        transform: [{translateY: positionY.value}],
    }));


    useEffect(() => {
        linear.value = withRepeat(
            withTiming( {
                duration,
                easing: Easing.linear,
            }),
            -1,
            true
        );//permet de definir l'effet rebondi
        // defaultAnim.value = withRepeat(
        //     withTiming(-defaultAnim.value, {
        //         duration,
        //     }),
        //     -1,
        //     true
        // );
    }, []);

    return (
        <View style={styles.container}>
            <Link href="/" style={styles.link}>Home</Link>
            <Button title="Animate !"
                onPress={() => {
                    positionY.value = withTiming(positionY.value + 100, {
                        duration,
                        easing: Easing.linear,
                    });
                }}
                 />
            <Animated.Image
                source={require('../assets/asteroide.jpg')}
                style={[styles.image, animatedDefault]}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C0C0C'
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
        width: 125
    },
    box: {
        height: 80,
        width: 80,
        margin: 20,
        borderWidth: 1,
        borderColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: '#b58df1',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
})