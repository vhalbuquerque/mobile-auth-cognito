import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const SignInHeader = ({ onPressBack }) => {
  return (
    <View>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.container} onPress={onPressBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.title}>Try another sign-in methods</Text>
        </TouchableOpacity>
      </Link >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'start',
    backgroundColor: '#fff',
    width: '100%',
    height: 70,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});

export default SignInHeader;
