import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ACCENT = '#6495ED';
const DARK_NAVY = '#0F1E3D';
const BG = '#F3F5F9';
const CARD_BG = '#FFFFFF';
const BORDER = '#E6E9F0';
const TEXT_DARK = '#0F1E3D';
const TEXT_MUTED = '#8A93A6';
const CHIP_BG = '#E8EEFC';
const CHIP_TEXT = '#1D3E8F';
const ICON_BG = '#EAF0FD'; // shared background for every icon box on this screen

// ---------------------------------------------------------------------------
// DATA — replace this with your API response. Shape kept identical so the
// UI below needs zero changes when you swap in real data.
// ---------------------------------------------------------------------------
const SEMESTERS = [
  {
    id: 'sem1',
    label: 'Semester I',
    subjects: [
      {
        id: 'applied-electricity',
        name: 'Applied Electricity and Electronics',
        years: [
          { year: 2019, papers: ['December 2019'] },
          { year: 2018, papers: ['June 2018'] },
          { year: 2017, papers: ['December 2017', 'June 2017'] },
        ],
      },
      {
        id: 'applied-maths',
        name: 'Applied Mathematics',
        years: [
          { year: 2024, papers: ['June 2024'] },
          { year: 2023, papers: ['December 2023'] },
          { year: 2022, papers: ['December 2022', 'June 2022'] },
          { year: 2020, papers: ['October 2020', 'January 2020'] },
          { year: 2019, papers: ['December 2019', 'November 2019'] },
          { year: 2018, papers: ['December 2018', 'July 2018', 'June 2018', 'May 2018'] },
          { year: 2017, papers: ['December 2017', 'July 2017', 'June 2017'] },
        ],
      },
      {
        id: 'applied-sciences',
        name: 'Applied Sciences',
        years: [
          { year: 2024, papers: ['June 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023', 'June 2023'] },
          { year: 2022, papers: ['December 2022', 'June 2022'] },
          { year: 2020, papers: ['October 2020', 'January 2020'] },
          { year: 2019, papers: ['December 2019', 'November 2019'] },
          { year: 2018, papers: ['December 2018', 'July 2018', 'June 2018', 'May 2018'] },
        ],
      },
      {
        id: 'bridge-equipment',
        name: 'Bridge Equipment and COLREGS',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2024, papers: ['December 2024'] },
        ],
      },
      {
        id: 'cargo-handling',
        name: 'Cargo Handling Stowage and Seamanship I',
        years: [
          { year: 2025, papers: ['June 2025'] },
          { year: 2024, papers: ['June 2024'] },
          { year: 2023, papers: ['December 2023'] },
          { year: 2022, papers: ['December 2022'] },
          { year: 2020, papers: ['January 2020'] },
          { year: 2019, papers: ['December 2019', 'November 2019'] },
          { year: 2018, papers: ['November 2018', 'July 2018', 'June 2018', 'May 2018'] },
          { year: 2017, papers: ['December 2017', 'November 2017', 'June 2017', 'May 2017'] },
        ],
      },
      {
        id: 'cargo-work',
        name: 'Cargo Work',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2024, papers: ['December 2024'] },
        ],
      },
      {
        id: 'english-hf-history',
        name: 'English Human Factors and Maritime History',
        years: [
          { year: 2023, papers: ['December 2023'] },
          { year: 2022, papers: ['December 2022'] },
          { year: 2020, papers: ['September 2020'] },
          { year: 2019, papers: ['December 2019', 'November 2019'] },
          { year: 2018, papers: ['December 2018', 'June 2018', 'May 2018'] },
          { year: 2017, papers: ['December 2017', 'June 2017'] },
        ],
      },
      {
        id: 'english-hf-history-2',
        name: 'English Human Factors And Martime History',
        years: [{ year: 2024, papers: ['June 2024', 'June 2024'] }],
      },
      {
        id: 'marine-met',
        name: 'Marine Meteorology',
        years: [{ year: 2025, papers: ['June 2025'] }],
      },
      {
        id: 'maritime-english',
        name: 'Maritime English',
        years: [
          { year: 2025, papers: ['December 2025'] },
          { year: 2024, papers: ['December 2024', 'June 2024'] },
        ],
      },
      {
        id: 'mathematics',
        name: 'Mathematics',
        years: [
          { year: 2025, papers: ['December 2025'] },
          { year: 2024, papers: ['December 2024', 'June 2024'] },
        ],
      },
      {
        id: 'nav1',
        name: 'Navigation I Terrestrial and Celestial Navigation',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2024, papers: ['December 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023', 'June 2023'] },
          { year: 2022, papers: ['December 2022'] },
          { year: 2020, papers: ['September 2020', 'January 2020'] },
          { year: 2019, papers: ['December 2019', 'November 2019'] },
          { year: 2018, papers: ['December 2018', 'July 2018', 'June 2018', 'May 2018'] },
          { year: 2017, papers: ['December 2017', 'July 2017', 'June 2017', 'May 2017'] },
        ],
      },
      {
        id: 'nav2',
        name: 'Navigation II',
        years: [
          { year: 2024, papers: ['June 2024'] },
          { year: 2022, papers: ['December 2023'] },
          { year: 2017, papers: ['December 2017'] },
        ],
      },
      {
        id: 'physics',
        name: 'Physics',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2024, papers: ['December 2024'] },
        ],
      },
      {
        id: 'ship-construction-2',
        name: 'Ship Construction & Ship Stability – II',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2024, papers: ['December 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023'] },
          { year: 2017, papers: ['December 2017'] },
        ],
      },
    ],
  },
  {
    id: 'sem2',
    label: 'Semester II',
    subjects: [
      {
        id: 'bridge-electronics',
        name: 'Bridge Electronics Equipment and Watch Keeping',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2024, papers: ['December 2024'] },
          { year: 2022, papers: ['June 2022'] },
          { year: 2019, papers: ['December 2019', 'July 2019'] },
        ],
      },
      {
        id: 'cargo-handling-2',
        name: 'Cargo Handling Stowage and Seamanship II',
        years: [
          { year: 2024, papers: ['December 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023', 'June 2023'] },
          { year: 2022, papers: ['December 2022', 'June 2022'] },
          { year: 2020, papers: ['December 2020'] },
          { year: 2019, papers: ['December 2019', 'November 2019', 'June 2019'] },
          { year: 2018, papers: ['December 2018', 'June 2018', 'May 2018'] },
          { year: 2017, papers: ['July 2017', 'June 2017', 'May 2017'] },
        ],
      },
      {
        id: 'cargo-work-2',
        name: 'Cargo Work II',
        years: [{ year: 2025, papers: ['December 2025', 'June 2025'] }],
      },
      {
        id: 'celestial-navigation',
        name: 'Celestial Navigation',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2022, papers: ['June 2022'] },
          { year: 2019, papers: ['December 2019', 'June 2019'] },
        ],
      },
      {
        id: 'contingency-preparedness',
        name: 'Contingency Preparedness',
        years: [{ year: 2025, papers: ['December 2025', 'June 2025'] }],
      },
      {
        id: 'emergencies-maritime-comm',
        name: 'Emergencies Maritime Communication and Commercial Shipping',
        years: [
          { year: 2024, papers: ['December 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023', 'June 2023'] },
          { year: 2022, papers: ['December 2022', 'June 2022'] },
          { year: 2019, papers: ['December 2019', 'November 2019', 'June 2019'] },
          { year: 2018, papers: ['December 2018'] },
          { year: 2017, papers: ['December 2017', 'June 2017'] },
        ],
      },
      {
        id: 'marine-met-2',
        name: 'Marine Meteorology',
        years: [{ year: 2025, papers: ['December 2025', 'June 2025'] }],
      },
      {
        id: 'marine-pollution',
        name: 'Marine Pollution Prevention',
        years: [{ year: 2025, papers: ['December 2025', 'June 2025'] }],
      },
      {
        id: 'maritime-history-commerce',
        name: 'Maritime History and Commerce',
        years: [
          { year: 2019, papers: ['December 2019'] },
          { year: 2018, papers: ['June 2018'] },
          { year: 2017, papers: ['June 2017'] },
        ],
      },
      {
        id: 'marpol-marine-engineering',
        name: 'MARPOL and Marine Engineering Knowledge',
        years: [
          { year: 2024, papers: ['December 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023', 'June 2023'] },
          { year: 2022, papers: ['December 2022', 'July 2022', 'June 2022'] },
          { year: 2019, papers: ['December 2019', 'June 2019'] },
          { year: 2018, papers: ['December 2018', 'June 2018'] },
          { year: 2017, papers: ['June 2017'] },
        ],
      },
      {
        id: 'navigation-3',
        name: 'Navigation III - Navigation and Chartwork',
        years: [
          { year: 2024, papers: ['December 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023', 'June 2023'] },
          { year: 2022, papers: ['December 2022', 'June 2022'] },
          { year: 2018, papers: ['June 2018'] },
        ],
      },
      {
        id: 'navigation-4',
        name: 'Navigation IV - Advanced Bridge Equip, Watch-Keeping and Meteorology',
        years: [
          { year: 2024, papers: ['June 2024'] },
          { year: 2023, papers: ['December 2023'] },
          { year: 2022, papers: ['December 2022', 'July 2022'] },
          { year: 2018, papers: ['December 2018', 'July 2018'] },
        ],
      },
      {
        id: 'ship-construction-stability-2',
        name: 'Ship Construction and Ship Stability - II',
        years: [
          { year: 2025, papers: ['December 2025', 'June 2025'] },
          { year: 2024, papers: ['December 2024', 'June 2024'] },
          { year: 2023, papers: ['December 2023'] },
          { year: 2022, papers: ['December 2022', 'June 2022'] },
          { year: 2019, papers: ['December 2019', 'June 2019'] },
          { year: 2018, papers: ['June 2018'] },
          { year: 2017, papers: ['December 2017'] },
        ],
      },
    ],
  },
];

const totalPapers = (subject) =>
  subject.years.reduce((sum, y) => sum + y.papers.length, 0);

const totalYears = (subject) => subject.years.length;

// 👇 Change ONLY this line to swap the icon used on every subject card.
const SUBJECT_ICON = 'reader-outline';

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function PastYearPapersScreen({ route }) {
  const navigation = useNavigation();
  // Optional course code shown under the header title (e.g. "DNS").
  // Pass it via navigation params: navigation.navigate('PastYearPapers', { courseCode: 'DNS' })
  const courseCode = route?.params?.courseCode;
  const [activeSemId, setActiveSemId] = useState(SEMESTERS[0].id);
  const [expandedId, setExpandedId] = useState(null);

  const activeSem = useMemo(
    () => SEMESTERS.find((s) => s.id === activeSemId),
    [activeSemId]
  );

  const subjectsCount = activeSem.subjects.length;
  const papersCount = activeSem.subjects.reduce(
    (sum, s) => sum + totalPapers(s),
    0
  );

  const toggleSubject = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const selectSemester = (id) => {
    if (id === activeSemId) return;
    setActiveSemId(id);
    setExpandedId(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={20} color={DARK_NAVY} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap} pointerEvents="none">
          <Text style={styles.headerTitle} numberOfLines={1}>
            Past Year Papers
          </Text>
          {!!courseCode && (
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              {courseCode}
            </Text>
          )}
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Semester card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconBoxLight}>
              <Ionicons name="briefcase-outline" size={20} color={ACCENT} />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.cardTitle}>Semester</Text>
              <Text style={styles.cardSubtitle}>
                {SEMESTERS.length} semesters
              </Text>
            </View>
          </View>

          <View style={styles.semRow}>
            {SEMESTERS.map((sem) => {
              const selected = sem.id === activeSemId;
              return (
                <TouchableOpacity
                  key={sem.id}
                  style={[styles.semTile, selected && styles.semTileActive]}
                  activeOpacity={0.7}
                  onPress={() => selectSemester(sem.id)}
                >
                  <View style={styles.semTileTopRow}>
                    <View style={styles.iconBoxTiny}>
                      <Ionicons
                        name="briefcase"
                        size={14}
                        color={selected ? ACCENT : DARK_NAVY}
                      />
                    </View>
                    <Text
                      style={[
                        styles.semTileTitle,
                        selected && { color: ACCENT },
                      ]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.85}
                    >
                      {sem.label}
                    </Text>
                  </View>

                  {selected ? (
                    <View style={styles.semTileBadgeActive}>
                      <Ionicons name="checkmark-circle" size={12} color="#FFFFFF" />
                      <Text style={styles.semTileBadgeActiveText}>Active</Text>
                    </View>
                  ) : (
                    <View style={styles.semTileBadge}>
                      <Text style={styles.semTileBadgeText}>Tap to open</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Subjects card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconBoxLight}>
              <Ionicons name="book-outline" size={20} color={ACCENT} />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.cardTitle}>Subjects</Text>
              <Text style={styles.cardSubtitle}>
                {subjectsCount} subjects and {papersCount} papers
              </Text>
            </View>
          </View>
          <Text style={styles.tapHint}>Tap a subject to view year-wise papers</Text>

          {activeSem.subjects.map((subject) => {
            const isOpen = expandedId === subject.id;
            const sortedYears = [...subject.years].sort(
              (a, b) => b.year - a.year
            );
            return (
              <View
                key={subject.id}
                style={[
                  styles.subjectCard,
                  isOpen && styles.subjectCardOpen,
                ]}
              >
                <TouchableOpacity
                  style={styles.subjectRow}
                  activeOpacity={0.7}
                  onPress={() => toggleSubject(subject.id)}
                >
                  <View
                    style={[
                      styles.iconBoxSmall,
                      isOpen && { backgroundColor: ACCENT },
                    ]}
                  >
                    <Ionicons
                      name={SUBJECT_ICON}
                      size={16}
                      color={isOpen ? '#FFFFFF' : DARK_NAVY}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text
                      style={[
                        styles.subjectName,
                        isOpen && { color: ACCENT },
                      ]}
                      numberOfLines={2}
                    >
                      {subject.name}
                    </Text>
                    <Text style={styles.subjectMeta}>
                      {totalPapers(subject)} papers - {totalYears(subject)} years
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.chevronCircle,
                      isOpen && { backgroundColor: ACCENT },
                    ]}
                  >
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={14}
                      color={isOpen ? '#FFFFFF' : TEXT_MUTED}
                    />
                  </View>
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.yearsWrap}>
                    {sortedYears.map((y) => (
                      <View key={y.year} style={{ marginBottom: 14 }}>
                        <View style={styles.yearHeaderRow}>
                          <Text style={styles.yearLabel}>{y.year}</Text>
                          <View style={styles.yearDivider} />
                        </View>
                        <View style={styles.chipsRow}>
                          {y.papers.map((p, idx) => (
                            <View key={`${y.year}-${idx}`} style={styles.chip}>
                              <Text style={styles.chipText}>{p}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating home button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home" size={22} color="#FFFFFF" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// STYLES
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    minHeight: 56,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EEFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: { width: 40, height: 40 },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_MUTED,
    letterSpacing: 1,
    marginTop: 2,
    textAlign: 'center',
  },

  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },

  card: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#EEF1F7',
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 2,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  iconBoxLight: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: TEXT_DARK, letterSpacing: 0.1 },
  cardSubtitle: { fontSize: 12, color: TEXT_MUTED, marginTop: 2 },

  semRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },
  semTile: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#F7F8FB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EDEFF4',
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 1,
  },
  semTileActive: {
    backgroundColor: '#EEF3FE',
    borderColor: ACCENT,
    borderWidth: 1.5,
    shadowColor: ACCENT,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  semTileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  semTileTitle: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: TEXT_DARK,
    letterSpacing: 0.1,
  },
  semTileBadge: {
    marginTop:1,
    marginLeft: 30,
    alignSelf: 'flex-start',
    maxWidth: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECF3',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  semTileBadgeText: { fontSize: 10, fontWeight: '700', color: TEXT_MUTED },
  semTileBadgeActive: {
    marginTop:1,
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
    backgroundColor:'#2563EB',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  semTileBadgeActiveText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },

  tapHint: { fontSize: 12, color: TEXT_MUTED, marginTop: 12, marginBottom: 14 },

  subjectCard: {
    borderWidth: 1,
    borderColor: '#EFF1F6',
    borderLeftWidth: 3,
    borderLeftColor: '#C9D9F7',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#FBFCFE',
  },
  subjectCardOpen: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D7E1F5',
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  subjectRow: { flexDirection: 'row', alignItems: 'center' },
  iconBoxSmall: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxTiny: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectName: { fontSize: 14, fontWeight: '700', color: TEXT_DARK, letterSpacing: 0.1 },
  subjectMeta: { fontSize: 12, color: TEXT_MUTED, marginTop: 3 },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E8F0',
    backgroundColor: '#FAFBFD',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  yearsWrap: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F5',
  },
  yearHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  yearLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_DARK,
    marginRight: 8,
  },
  yearDivider: { flex: 1, height: 1, backgroundColor: '#EEF0F5' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: CHIP_BG,
    borderWidth: 1,
    borderColor: '#DCE6FA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: { fontSize: 12, fontWeight: '700', color: CHIP_TEXT },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: ACCENT,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
});