import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";

export default function DataDog() {
    const [dogPosition, setDogPosition] = useState([]);

    useEffect(() => {
// Fonction asynchrone pour obtenir les données
        const fetchData = async () => {
            try {
                const response = await axios.get("https://3906-90-85-193-25.ngrok-free.app/api/dog", {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                setDogPosition(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };
        fetchData();
    }, []);


//vu que nous voulons récupérer plusieurs infos dans un tableau, 
//il convient de préciser quelles informations nous souhaitons voir apparaître
    const renderItem = ({ item }) => (
        <View style={styles.dogItem}>
            <Text style={styles.dogText}>ID: {item.id}, Name: {item.name}, Breed: {item.breed}</Text>
            <Text style={styles.dogText}>Birthdate: {item.birthdate}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Link href="/" style={styles.link}>Home</Link>
            {dogPosition.length > 0 ? (
                <FlatList
                    data={dogPosition}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.loadingText}>Chargement des données...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    link: {
        padding: 25,
        marginTop: 50,
        backgroundColor: 'lightgrey',
        width: 125,
        textAlign: 'center',
    },
    dogText: {
        marginVertical: 10,
        fontSize: 16,
    },
    loadingText: {
        margin: 10,
        fontSize: 16,
        color: 'grey',
    }
});
