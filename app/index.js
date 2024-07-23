import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
      <Text>Bienvenu sur notre site</Text>
      <Link href="/todo" asChild style={{padding:10, backgroundColor:'lightgray', width:125}}>
        <Pressable>
          <Text>Todo</Text>
        </Pressable>
      </Link>
      <Link href="/gesture" asChild style={{padding:10, backgroundColor:'lightgray', width:125}}>
        <Pressable>
          <Text>Gesture</Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

