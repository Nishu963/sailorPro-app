import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DEFAULT_PADDING_TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 4 : 6;

export default function Header({
  title,
  onBack,
  showBack = true,
  rightComponent,
  paddingTop = DEFAULT_PADDING_TOP,
  paddingBottom = 10,
  paddingHorizontal = 14,
  titleStyle,
}) {
  return (
    <View style={[styles.outer, { paddingTop, paddingBottom, paddingHorizontal }]}>
      <View style={styles.row}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBack}
            activeOpacity={0.85}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtnPlaceholder} />
        )}

        <View style={styles.titleWrap} pointerEvents="none">
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightWrap}>{rightComponent}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(186,230,253,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  backBtnPlaceholder: {
    width: 38,
    height: 38,
  },

  titleWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },

  rightWrap: {
    flexDirection: 'row',
    zIndex: 2,
  },
});
