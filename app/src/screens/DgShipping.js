import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SERVICES = [
  {
    key: 'dg-problem-solver',
    iconLib: 'mci',
    icon: 'lifebuoy',
    gradientColors: ['#5B9DFF', '#246BFF'],
    accentColor: '#246BFF',
    tintColor: '#EEF4FF',
    borderColor: 'rgba(36, 107, 255, 0.45)',
    title: 'DG Problem Solver',
    description:
      'Solve DG doubts faster with structured guidance and AI-powered help.',
    onPress: (navigation) => {
      navigation?.navigate('DGProblemSolver');
    },
  },
  {
    key: 'latest-circulars',
    iconLib: 'ion',
    icon: 'document-text',
    gradientColors: ['#FF9A5C', '#F2672A'],
    accentColor: '#F2672A',
    tintColor: '#FFF3EB',
    borderColor: 'rgba(242, 103, 42, 0.45)',
    title: 'Latest Circulars',
    description:
      'Stay updated with the latest DG circulars, notices, and shipping updates.',
    onPress: (navigation) => {
      navigation?.navigate('DGSOrders');
    },
  },
];

export default function DGShippingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.75}
          >
            <Ionicons name="chevron-back" size={26} color="#12171E" />
          </TouchableOpacity>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>DG Shipping</Text>
            <Text style={styles.headerSubtitle}>Official Maritime Services</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.key}
              iconLib={service.iconLib}
              icon={service.icon}
              gradientColors={service.gradientColors}
              accentColor={service.accentColor}
              tintColor={service.tintColor}
              borderColor={service.borderColor}
              title={service.title}
              description={service.description}
              onPress={() => service.onPress(navigation)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function ServiceCard({
  iconLib,
  icon,
  gradientColors,
  accentColor,
  tintColor,
  borderColor,
  title,
  description,
  onPress,
}) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.cardShadowWrap}>
      <View style={[styles.card, { borderColor }]}>
        <View style={[styles.cardGlow, { backgroundColor: tintColor }]} />

        <View style={styles.topRow}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.iconBox, { shadowColor: accentColor }]}
          >
            {iconLib === 'mci' ? (
              <MaterialCommunityIcons name={icon} size={28} color="#FFFFFF" />
            ) : (
              <Ionicons name={icon} size={26} color="#FFFFFF" />
            )}
          </LinearGradient>

          <View style={styles.textWrap}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={[styles.openText, { color: accentColor }]}>
            Open service
          </Text>

          <View style={[styles.arrowButton, { backgroundColor: tintColor }]}>
            <Ionicons name="arrow-forward" size={17} color={accentColor} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:
      (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) + 14,
    paddingBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#F5F6F8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerSpacer: {
    width: 44,
    height: 44,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#12171E',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 0.1,
  },

  headerSubtitle: {
    color: '#9098A3',
    fontSize: 13,
    marginTop: 3,
    fontWeight: '500',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },

  cardShadowWrap: {
    borderRadius: 24,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#1A2B4C',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
    }),
  },

  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
  },

  cardGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    right: -60,
    top: -60,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },

  textWrap: {
    flex: 1,
    paddingTop: 3,
  },

  cardTitle: {
    color: '#12171E',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 23,
  },

  cardDescription: {
    color: '#8A93A0',
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 6,
  },

  bottomRow: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  openText: {
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: 0.1,
  },

  arrowButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});