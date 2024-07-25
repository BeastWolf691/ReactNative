import { Link } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Button } from "react-native";
import axios from "axios";

export default function DataDog() {
    const [dogPosition, setDogPosition] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(4);
    const [showFloating, setShowFloating] = useState(false);
    const list = useRef();
    const [selectedDogs, setSelectedDogs] = useState([]);

    useEffect(() => {
        // Fonction asynchrone pour obtenir les données
        const fetchData = async () => {
            try {
                const response = await axios.get("https://bunny-relaxing-quickly.ngrok-free.app/api/dog", {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                        // nécessaire seulement car hébergeur du serveur
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
        <Pressable
            onLongPress={() => select(item)}
            onPress={() => selectedDogs.length > 0 && select(item)}>
            {/*cette modification permet d'affecter des couleurs selon la selection des chiens avec onLongPress */}
            <View style={{ ...styles.dogItem, backgroundColor: selectedDogs.includes(item) ? "#ccc" : "#fff" }}>
                <Text style={styles.dogText}>ID: {item.id}, Name: {item.name}, Breed: {item.breed}</Text>
                <Text style={styles.dogBirth}>Birthdate: {item.birthdate}</Text>
            </View>
        </Pressable >
    );

    function refreshHandle() {
        setPage(1);
        setDogPosition([]);
        fetchData();
    }

    function select(dog) {//permet de selectionner les chiens
        if (selectedDogs.includes(dog)) {
            setSelectedDogs(selectedDogs.filter(item => dog != item))
        } else {
            setSelectedDogs([
                ...selectedDogs,
                dog
            ]);
        }
    }

    async function deleteSelected() {//ce code permet lors d'une selection de pouvoir ensuite supprimer
        try {
            for (const dog of selectedDogs) {
                await axios.delete(`https://bunny-relaxing-quickly.ngrok-free.app/api/dog/${dog.id}`, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
            }
            setDogPosition(dogPosition.filter(dog => !selectedDogs.includes(dog)));
            setSelectedDogs([]);
        } catch (error) {
            console.error("Erreur lors de la suppression des données : ", error);
        }
    }

    return (
        <View style={styles.container}>
            <Link href="/" style={styles.link}>Home</Link>
            {/* <Button title='suivant'style={styles.button} onPress={() => setPage(page + 1)}/> permet lors de l'appuie que les chiens s'ajoutent */}
            {showFloating &&
                <Pressable onPress={() => list.current.scrollToIndex({ index: 0 })} style={styles.floatingButton}>{/*besoin de renseigner l'objet avec un argument index*/}
                    <Text>↑</Text>
                </Pressable>
            }
            {selectedDogs.length > 0 &&//cet effet de bouton prend en compte le deleteselected que nous avons fait en fonction plus haut
                <Pressable onPress={deleteSelected} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </Pressable>
            }
            {dogPosition.length > 0 ? (
                <FlatList
                    ref={list}
                    data={dogPosition}
                    refreshing={isLoading}
                    onRefresh={refreshHandle}
                    //permet d'avoir l'effet où lorsqu'on scroll, la fleche pr remonter n'arrive qu'après avoir dépassé une limite
                    onScrollEndDrag={(event) => event.nativeEvent.contentOffset.y > 50 && setShowFloating(true)}
                    onStartReached={() => setShowFloating(false)}
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
    },
    deleteButton: {
        position: 'absolute',
        top: 50,
        right: 25,
        padding: 10,
        backgroundColor: '#FB4D4D',
        borderRadius: 50,
        width:50
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 10
        
    }
});

/**CRUD SUR API REST
 * get /api/dog
 * get /api/dog/:id
 * post /api/dog
 * delete /api/dog/:id
 * patch/put /api/dog/:id > attend un dog ou un fragment de dog pour un patch dans son 
 */