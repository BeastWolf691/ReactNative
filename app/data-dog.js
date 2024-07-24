import { Link } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Button } from "react-native";
import axios from "axios";

export default function DataDog() {
    const [dogPosition, setDogPosition] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const list = useRef();

    useEffect(() => {
        // Fonction asynchrone pour obtenir les données
        const fetchData = async () => {
            try {
                const response = await axios.get("https://bunny-relaxing-quickly.ngrok-free.app/api/dog", {
                    headers: {
                        'ngrok-skip-browser-warning': 'true' // nécessaire seulement car hébergeur du serveur
                    },
                    params: { page }
                });
                setDogPosition([...dogPosition, ...response.data]);//permet de rajouter a la suite les autres chiens en appuyant sur le bouton
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };
        fetchData();
    }, [page]);//permet d'incrémenter chaque page et renouvelle l'affichage

    // Vu que nous voulons récupérer plusieurs infos dans un tableau, 
    // il convient de préciser quelles informations nous souhaitons voir apparaître
    const renderItem = ({ item }) => (
        <View style={styles.dogItem}>
            <Text style={styles.dogText}>ID: {item.id}, Name: {item.name}, Breed: {item.breed}</Text>
            <Text style={styles.dogBirth}>Birthdate: {item.birthdate}</Text>
        </View>
    );

    function refreshHandle() {
        setPage(1);
        setDogPosition([]);
        fetchData();
    }
    return (
        <View style={styles.container}>
            <Link href="/" style={styles.link}>Home</Link>
            {/* <Button title='suivant'style={styles.button} onPress={() => setPage(page + 1)}/> permet lors de l'appuie que les chiens s'ajoutent */}
            <Pressable onPress={() => list.current.scrollToIndex({index:0})} style={styles.floatingButton}>{/*besoin de renseigner l'objet avec un argument index*/}
                <Text>↑</Text>
            </Pressable>

            {dogPosition.length > 0 ? (
                <FlatList
                    ref={list}
                    data={dogPosition}
                    refreshing={isLoading}
                    onRefresh={refreshHandle}
                    onEndReached={() => setPage(page + 1)}
                    onEndReachedThreshold={3}
                    keyExtractor={item => item.id.toString()}
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
        backgroundColor: '#FFC300'
    },
    loadingText: {
        margin: 10,
        fontSize: 16,
        color: 'grey',
    },
    dogItem: {
        paddingStart: 20
    },
    dogBirth: {
        backgroundColor: '#9FE6F7'
    },
    button: {
        backgroundColor: '#D0BA74',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    floatingButton: {
        padding: 20,
        borderRadius: 100,
        backgroundColor: 'skyblue',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 5,
        right: 10,
        width: 25,
        zIndex: 1
    }
});
