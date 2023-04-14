import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const MessageModal = ({ message, onClose }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const slideUp = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return (
    <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideUp }] }]}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close-outline" size={36} color="#4B4B4B" />
        </TouchableOpacity>
        <View style={{ marginTop: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="mail-outline" size={40} color="green" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Animated.View >
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  message: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MessageModal;
