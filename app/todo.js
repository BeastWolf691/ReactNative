import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import TodoList from '../components/ToDoList';

export default function Todo() {
  return (
    <View style={styles.container}>
      <Text>Benvenu sur la page TO DO LIST</Text>
      <TodoList />
      <StatusBar style="auto" />
      <View style={styles.subContainer}>

        <Link href="/" asChild style={{padding:25, backgroundColor:'lightgray', width:125}}>
          <Pressable>
            <Text>Accueil</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
