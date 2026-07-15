import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

// ---------- Design constants (same as rest of the app) ----------
const ACCENT = '#6495ED';
const DARK_NAVY = '#0F1E3D';
const ICON_BG = '#EAF0FD';
const CARD_SHADOW = '#1B2A4A';

// ---------- Data ----------
const SECTIONS = [
  {
    id: 'guidelines',
    heading: 'Guidelines',
    items: [
      { id: 'g1', title: 'SSTP Guidelines', fileUrl: '', offlineReady: true },
    ],
  },
  {
    id: 'workbooks',
    heading: 'Workbooks',
    items: [
      { id: 'w1', title: 'Shipboard Activity Workbook 1', fileUrl: '', offlineReady: true },
      { id: 'w2', title: 'Shipboard Activity Workbook 2', fileUrl: '' },
    ],
  },
  {
    id: 'projects',
    heading: 'Projects',
    items: [
      { id: 'p1', title: 'Project Navigation 1', fileUrl: '' },
      { id: 'p2', title: 'Project Navigation 2', fileUrl: '' },
      { id: 'p3', title: 'Project Navigation 3', fileUrl: '' },
      { id: 'p4', title: 'Project Controlling 1', fileUrl: '' },
      { id: 'p5', title: 'Project Controlling 2', fileUrl: '' },
    ],
  },
  {
    id: 'additional-projects',
    heading: 'Additional Projects',
    items: [
      { id: 'ap1', title: 'Additional Project for Bulk Carriers 2', fileUrl: '' },
      { id: 'ap2', title: 'Additional Projects for Gas Carriers 1', fileUrl: '' },
      { id: 'ap3', title: 'Additional Project for Containers Vessels 2', fileUrl: '' },
      { id: 'ap4', title: 'Additional Project for Offshore Vessels 1', fileUrl: '' },
      { id: 'ap5', title: 'Additional Project for Oil Tankers 1', fileUrl: '' },
    ],
  },
  {
    id: 'supplements',
    heading: 'Supplements',
    items: [
      { id: 's1', title: 'Supplement for Oil Tanker 1', fileUrl: '' },
      { id: 's2', title: 'Supplement for Oil Tanker 2', fileUrl: '' },
      { id: 's3', title: 'Supplement for Chemical Tanker 1', fileUrl: '' },
    ],
  },
];

export default function SSTPScreen() {
  const navigation = useNavigation();

  const handleOpenPdf = (item) => {
    // navigate to your PDF viewer screen, e.g.:
    // navigation.navigate('PdfViewer', { url: item.fileUrl, title: item.title });
  };

  const goHome = () => {
    navigation.navigate('CollegeCorner');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={22} color={DARK_NAVY} />
        </TouchableOpacity>

        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>SSTP</Text>
          <Text style={styles.headerSubtitle}>Shipboard training</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <View key={section.id} style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>{section.heading}</Text>

            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemRow}
                activeOpacity={0.7}
                onPress={() => handleOpenPdf(item)}
              >
                <View style={styles.iconWrap}>
                  <Feather name="file-text" size={20} color={ACCENT} />
                </View>

                <View style={styles.itemTextWrap}>
                  <View style={styles.titleRow}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    {item.offlineReady && (
                      <View style={styles.offlineBadge}>
                        <Feather name="check-circle" size={10} color="#16A34A" />
                        <Text style={styles.offlineBadgeText}>Offline Ready</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.itemSubtitle}>Open PDF</Text>
                </View>

                <Feather name="chevron-right" size={20} color="#9AA5B1" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Floating Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={goHome}
        activeOpacity={0.85}
      >
        <Feather name="home" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_NAVY,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8A93A3',
    marginTop: 2,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(100, 149, 237, 0.20)',
    shadowColor: CARD_SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: DARK_NAVY,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(100, 149, 237, 0.12)',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemTextWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: DARK_NAVY,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#9AA5B1',
    marginTop: 2,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.14)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 11,
  },
  offlineBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#16A34A',
    marginLeft: 3,
  },
  homeButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CARD_SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
});