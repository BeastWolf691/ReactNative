
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function ToDoList() {
    const [task, setTask] = useState('');
    const [list, setList] = useState(['Lessive', 'Gaming', 'Dormir', 'Surveiller', 'Wc']);
    const [startPosition, setStartPosition] = useState(0);

    function addTask() {
        setList([...list, task]);
        setTask('');
    }

    function removeTask(indexToRemove) {
        setList(list.filter((_, index) => index !== indexToRemove));
        setTask('');
    }

    function swipeHandle(endPosition, index) {
        if (endPosition > startPosition + 50) {
            removeTask(index);
        }
    }
        return (
            <View style={styles.container}>
                <Text>  TO DO LIST {task}</Text>
                <TextInput
                    placeholder='entrer une tache'
                    value={task}
                    onChangeText={(text) => setTask(text)} />

                <Button title='ajouter une tache' onPress={addTask} />
                {list.map((item, index) =>
                    <View
                        key={index}
                        onTouchStart={(event) => setStartPosition(event.nativeEvent.locationX)}
                        style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', margin: 2 }}
                        onTouchEnd={(event) => swipeHandle(event.nativeEvent.locationX, index)}>
                        <Text style={styles.txt}>{item}</Text>
                        <Button title='suppr' onPress={() => removeTask(index)} />
                    </View>)}

            </View>
        );
    }
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#ccc',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 50
        },
        txt: {
            fontSize: 40

        }
    });


