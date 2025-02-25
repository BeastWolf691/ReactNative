import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing, useAnimatedSensor, SensorType, useAnimatedRef } from "react-native-reanimated";
import { StyleSheet, View, Button } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";


export default function game({ }) {
    const top = useSharedValue(0);
    const rotation = useSharedValue(0);
    const left = useSharedValue(0);
    const rotationSensor = useAnimatedSensor(SensorType.ROTATION);

    const animatedDefault = useAnimatedStyle(() => ({
        top: top.value + '%',//fait qu'il part du haut

        left: left.value + '%',//fait qu'il sera deplacé sur les cotés

        transform: [{
            rotate: rotation.value + 'deg'
        }]//fait pour la rotation
    }));

    const shipStyle = useAnimatedStyle(() => ({
        bottom: 5,
        left: '40%',
        transform: [{
            translateX: rotationSensor.sensor.value.roll * 150
        }]
    }))


useEffect(() => {
    // Animation de la rotation
    rotation.value = withRepeat(
        withTiming(200, { duration: 3000, easing: Easing.linear }),
        -1
    );

    // Animation du déplacement vertical et mise à jour de la position left
    top.value = withRepeat(
        withTiming(100, {
            duration: 3000,
            easing: Easing.linear,
        }, () => {
            // Callback qui change la valeur de left
            left.value = Math.random() * 80;
        }),
        -1
    );
}, []);


return (
    <View style={styles.container}>
        <Link href="/" style={styles.link}>Home</Link>

        <Animated.Image
            source={require('../assets/asteroide.jpg')}
            //chemin pour affecter une image ou meme un lien
            style={[animatedDefault, {zIndex:1}]}
        />
        <Animated.Image
            source={require('../assets/vaisseauSTUSS.jpg')}
            //chemin pour affecter une image ou meme un lien
            style={[shipStyle, { width: 100, height: 100, position: 'absolute', top: '85%'}]}
        />
    </View>
);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C0C0C'
    },
    link: {
        padding: 25,
        marginTop: 50,
        backgroundColor: 'lightgrey',
        width: 125
    }

});