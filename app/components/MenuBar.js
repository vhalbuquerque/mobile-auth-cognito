import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function MenuBar({ navigation, activeMenuItem }) {
  return <View style={styles.bottomMenu}>
    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Questionnaire")}>
      <Ionicons
        name='person'
        size={28}
        color={activeMenuItem === 'questionnaire' ? 'blue' : 'gray'} />
      <Text style={{
        ...styles.menuLabel,
        color: (activeMenuItem === 'questionnaire' ? "blue" : "gray")
      }}>
        Questionnaire
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        ...styles.menuItem,
        color: (activeMenuItem === 'home' ? "blue" : "gray")
      }}
      onPress={() => navigation.navigate("Home")}
    >
      <Ionicons
        name='document-text'
        size={28}
        color={activeMenuItem === 'home' ? 'blue' : 'gray'}
      />
      <Text
        style={{
          ...styles.menuLabel,
          color: (activeMenuItem === 'home' ? "blue" : "gray")
        }}>
        Portfolio
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate("Settings")}>
      <Ionicons
        name='settings'
        size={28}
        color={activeMenuItem === 'settings' ? 'blue' : 'gray'}
      />
      <Text
        style={{
          ...styles.menuLabel,
          color: (activeMenuItem === 'settings' ? "blue" : "gray")
        }}>
        Settings
      </Text>
    </TouchableOpacity>
  </View >;
}

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF4',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  menuLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});
