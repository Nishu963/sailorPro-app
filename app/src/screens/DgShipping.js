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
    accentColor: '#5798FF',
    borderColor: '#29456F',
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
    accentColor: '#FF914D',
    borderColor: '#68402B',
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
      <StatusBar barStyle="light-content" backgroundColor="#0A0E13" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.75}
          >
            <Ionicons name="chevron-back" size={27} color="#FFFFFF" />
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
  borderColor,
  title,
  description,
  onPress,
}) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress}>
      <LinearGradient
        colors={['#172231', '#101720']}
        style={[styles.card, { borderColor }]}
      >
        <View style={[styles.cardGlow, { backgroundColor: accentColor }]} />

        <View style={styles.topRow}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconBox}
          >
            {iconLib === 'mci' ? (
              <MaterialCommunityIcons name={icon} size={30} color="#FFFFFF" />
            ) : (
              <Ionicons name={icon} size={28} color="#FFFFFF" />
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

          <View style={[styles.arrowButton, { borderColor: accentColor }]}>
            <Ionicons name="arrow-forward" size={18} color={accentColor} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0A0E13',
  },

  container: {
    flex: 1,
    backgroundColor: '#0A0E13',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:
      (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) + 14,
    paddingBottom: 26,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#151C25',
    borderWidth: 1,
    borderColor: '#263241',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
    }),
  },

  headerSpacer: {
    width: 48,
    height: 48,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: 0.2,
  },

  headerSubtitle: {
    color: '#8D98A6',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '600',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },

  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1.2,
    padding: 18,
    marginBottom: 18,
    backgroundColor: '#121922',
    ...Platform.select({
      android: {
        elevation: 7,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.28,
        shadowRadius: 16,
      },
    }),
  },

  cardGlow: {
    position: 'absolute',
    width: 145,
    height: 145,
    borderRadius: 73,
    opacity: 0.16,
    right: -45,
    top: -45,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  textWrap: {
    flex: 1,
    paddingTop: 2,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 25,
  },

  cardDescription: {
    color: '#9BA8B8',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    marginTop: 8,
  },

  bottomRow: {
    marginTop: 16,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF12',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  openText: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.2,
  },

  arrowButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    backgroundColor: '#FFFFFF08',
    alignItems: 'center',
    justifyContent: 'center',
  },
});