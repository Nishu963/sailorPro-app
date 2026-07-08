import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CIRCULARS_DATA = {
  2026: [
    { id: 'n1', type: 'notice', label: 'Notice', title: 'DG Shipping Oral Exam Update', date: '02 Jul 2026', isNew: false, isRead: true, offlineSaved: true, pdfUrl: '#' },
    { id: 'c34', number: '34 of 2026', title: 'SMY Course Mandatory for All Indian Seafarers', date: '01 Jul 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c35', number: '35 of 2026', title: 'Commencement of Seat Booking for Nautical Grade Competency Oral Examinations – July 2026', date: '29 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c33', number: '33 of 2026', title: 'Precautionary Measures for Indian Seafarers operating in the Gulf Region', date: '26 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c32', number: '32 of 2026', title: 'Commencement of Seat Booking for Nautical Grade Competency Written Examinations – July 2026', date: '24 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c31', number: '31 of 2026', title: 'Precautionary Measures for Indian Seafarers in view of the Heightened Security Situation in the Gulf Region – reg.', date: '13 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c29', number: '29 of 2026', title: 'Instructions regarding mandatory submission of FAL Forms through Maritime Single Window (MSW) System.', date: '08 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c28', number: '28 of 2026', title: 'Operationalisation of Oral Examination Booking on New Examination Portal for Candidates Whose Written Examination Results Were Declared in M...', date: '01 Jun 2026', isNew: false, isRead: true, offlineSaved: false, pdfUrl: '#' },
    { id: 'c27', number: '27 of 2026', title: 'Operationalisation of Oral Examination Booking on New Examination Portal for ASM (FG & NCV), Chief Mate (FG) and Second Mate (FG)', date: '26 May 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c25', number: '25 of 2026', title: 'Issuance of Electro-Technical Rating Certificate of Proficiency & progression to ETO certification, reg.', date: '19 May 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c26', number: '26 of 2026', title: 'Introduction of a six-month competency course for Deck Ratings to qualify for the Second Mate (Foreign Going) Certificate of Competency Exami...', date: '19 May 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c08', number: '08 of 2026', title: 'Preventive Measures to Reduce Abandonment of Indian Seafarers on Board Foreign-Flag Vessels - reg.', date: '14 May 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c21', number: '21 of 2026', title: 'Launch of the New Examination Module for the Merchant navy officers and Data Migration to the New System', date: '30 Apr 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c18', number: '18 of 2026', title: 'Revision of Rates for the MTI Exit Examination', date: '21 Apr 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c17', number: '17 of 2026', title: 'Update of Sefarer Profile on new e-Samudra Portal -reg', date: '07 Apr 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c16', number: '16 of 2026', title: 'Launch of New website and Discontinuation of old website', date: '16 Mar 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c15', number: '15 of 2026', title: 'Issues faced in export shipments through sea routes in view of the evolving situation in the Middle East - reg.', date: '13 Mar 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c10', number: '10 of 2026', title: 'Safety Advisory for Indian Seafarers and Shipping Stakeholders Operating in the Persian Gulf, Strait of Hormuz and Adjacent Waters - reg.', date: '06 Mar 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c8', number: '8 of 2026', title: 'Advisory to Indian Flag Vessels and Indian Seafarers regarding escalation of Security Situation in Iran, Strait of Hormuz, Persian Gulf a...', date: '28 Feb 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c9', number: '9 of 2026', title: 'Urgent Advisory to Indian Seafarers and Shipping Stakeholders in view of escalating situation in Iran - reg.', date: '28 Feb 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c7', number: '7 of 2026', title: 'Preparatory Course for Oral Examination leading to Nautical Grade Certificate of Competency under the STCW Convention- reg.', date: '21 Feb 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c6', number: '6 of 2026', title: 'Statistics of engagement of Indian Seafarers on Indian/ Foreign flagged Merchant Ships from 2010 to 2025', date: '06 Feb 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c2', number: '2 of 2026', title: 'Implementation and Standard Operating Procedure (SOP) for 24x7 Seafarers Facilication Counter at T2 Airport, Mumbai, during the Pilot P...', date: '23 Jan 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c1', number: '1 of 2026', title: 'Advisory to Indian Seafarers and Shipping Stakeholders in view of MEA Advisory on Iran – reg', date: '14 Jan 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
  ],
  2025: [
    { id: 'c55_25', number: '55 of 2025', title: 'Seafarers Advisory on Avoiding Fraud, Cheating and Unauthorized Recruitment during Employment', date: '11 Dec 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c56_25', number: '56 of 2025', title: 'Introduction of Revised Form-I (RPSL- for Indian seafarers working on foreign flag vessels). Form-IA (RPSL/Indian ship owner – for Indian seafarers wo...', date: '11 Dec 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c46_25', number: '46 of 2025', title: 'Collision / Contact damage between Manta Nigar and Jag Radha at P and V anchorage, Mumbai on 02.08.2025', date: '07 Oct 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c43_25', number: '43 of 2025', title: 'Prevention of Forged Entries in Continuous Discharge Certificates (CDCs) by RPSL Agents / Shipping Companies /Seafarers - reg', date: '01 Oct 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c42_25', number: '42 of 2025', title: 'Death of seafarer due to fall from Crane Cabin', date: '30 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c41_25', number: '41 of 2025', title: 'Revised Course Curriculum for Chief Mate (NCV) Phase-I and Phase-II Course', date: '23 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c39_25', number: '39 of 2025', title: "Welfare Schemes Administered by Seafarers' Welfare Fund Society (SWFS) for Indian Seafarers", date: '18 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c36_25', number: '36 of 2025', title: 'Revised Course Curriculum for NWKO (NCV) Course', date: '10 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'crew_25', type: 'notice', label: 'Crew Annual', title: 'Crew Annual Report 2024-2025', date: '25 Aug 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c31_25', number: '31 of 2025', title: 'Mandatory compliance measures to prevent engagement of Seafarers without appropriate training and demonstratable competence prior is...', date: '18 Jul 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c29_25', number: '29 of 2025', title: 'Commencement of Nautical Grade Examination at MMD Visakhapatnam', date: '12 Jul 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c26_25', number: '26 of 2025', title: 'Entry into force of the Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships, 2009', date: '26 May 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c24_25', number: '24 of 2025', title: 'Revised course Curriculum for Second Mate Foundation course', date: '21 May 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c21_25', number: '21 of 2025', title: 'Consideration for Multiple Admission Pathways in Maritime Education and Mechanism for Filling Unfilled Seats Due to IMU CET -Recommendation...', date: '13 May 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c22_25', number: '22 of 2025', title: 'Implementation of the Revised Exit Examination Framework for DG Shipping Approved Maritime Training Institute (MTIs)', date: '13 May 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c16_25', number: '16 of 2025', title: 'Revised course curriculum for the Master (NCV) – Advanced Shipboard Management course', date: '30 Apr 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c13_25', number: '13 of 2025', title: 'Statistics of engagement of Indian seafarers on Indian / Foreign Flag Merchant vessels from 2010 to 2024', date: '08 Apr 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c10_25', number: '10 of 2025', title: 'Collison between merchant vessel and Indian fishing vessels on the West Coast of India', date: '19 Mar 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c8_25', number: '8 of 2025', title: 'Issues faced by Shipping / RPS Companies while extending contractual Article of Agreement', date: '06 Mar 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c7_25', number: '7 of 2025', title: 'Procedure for retaining validity of previously passed subjects in Nautical examinations', date: '10 Feb 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c3_25', number: '3 of 2025', title: 'Basic awareness course for seafarers about seafarer awareness, FAQ, seafarer grievances, seafarer rights and safe and secure seafaring etc.', date: '06 Feb 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c4_25', number: '4 of 2025', title: 'Discontinuation of Exit Exams for Refresher Courses', date: '06 Feb 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c2_25', number: '2 of 2025', title: 'DGS proposal for initiatives towards seafarers financial and mental well-being by collection of requisite data', date: '22 Jan 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c1_25', number: '1 of 2025', title: 'Fatality on board a tanker while undergoing repairs at berth', date: '21 Jan 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
  ],
};

export default function DGSCircularsScreen({ navigation, onBack, onHome }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedYears, setExpandedYears] = useState({ 2026: true, 2025: false });
  const [bookmarks, setBookmarks] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [activeOfflinePopover, setActiveOfflinePopover] = useState(null);

  const handleBack = () => {
    if (onBack) onBack();
    else navigation?.goBack?.();
  };

  const toggleYear = (year) => {
    setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOfflinePopover = (id) => {
    setActiveOfflinePopover(prev => (prev === id ? null : id));
  };

  const getFilteredCirculars = (circulars) => {
    return circulars.filter(c => {
      if (activeTab === 'bookmarked') return !!bookmarks[c.id];
      if (activeTab === 'unread') return !c.isRead;
      return true;
    }).filter(c => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return c.title.toLowerCase().includes(q) || (c.number || '').toLowerCase().includes(q) || (c.label || '').toLowerCase().includes(q);
    });
  };

  const years = Object.keys(CIRCULARS_DATA).map(Number).sort((a, b) => b - a);
  const hasNoBookmarks = Object.values(bookmarks).every(v => !v);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#080C10" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.75}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>DGS Orders & Circulars</Text>
          <Text style={styles.headerSubtitle}>DG Shipping</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchWrap}>
        <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
          <View style={styles.searchIconCircle}>
            <Ionicons name="search" size={15} color="#FFFFFF" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search circular title or month..."
            placeholderTextColor="#4A5568"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color="#4A5568" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.tabsRow}>
        {[
          { key: 'all', label: 'All' },
          { key: 'bookmarked', label: 'Bookmarked' },
          { key: 'unread', label: 'Unread' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'bookmarked' && hasNoBookmarks ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="bookmark-outline" size={34} color="#4A5568" />
            </View>
            <Text style={styles.emptyTitle}>No bookmarks yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the bookmark icon on any circular to save it here.
            </Text>
          </View>
        ) : (
          years.map(year => {
            const circulars = getFilteredCirculars(CIRCULARS_DATA[year]);
            const isExpanded = expandedYears[year];

            if ((activeTab === 'bookmarked' || activeTab === 'unread') && circulars.length === 0) return null;

            return (
              <View key={year}>
                <TouchableOpacity
                  style={styles.yearRow}
                  onPress={() => toggleYear(year)}
                  activeOpacity={0.8}
                >
                  <View style={styles.yearLeft}>
                    <View style={styles.yearIconWrap}>
                      <Ionicons name="time-outline" size={13} color="#4C8DFF" />
                    </View>
                    <Text style={styles.yearText}>{year}</Text>
                  </View>
                  <View style={styles.yearRight}>
                    <View style={styles.yearCountBadge}>
                      <Text style={styles.yearCountText}>
                        {activeTab === 'all'
                          ? CIRCULARS_DATA[year].length
                          : circulars.length}
                      </Text>
                    </View>
                    <Text style={styles.yearCountLabel}>circulars</Text>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={15}
                      color="#4A5568"
                      style={{ marginLeft: 6 }}
                    />
                  </View>
                </TouchableOpacity>

                {isExpanded && circulars.map((item) => (
                  <View
                    key={item.id}
                    style={[
                      styles.card,
                      item.isNew && styles.cardNew,
                    ]}
                  >
                    <View style={styles.cardTopRow}>
                      <View style={styles.cardBadgesRow}>
                        {item.number ? (
                          <View style={styles.numberBadge}>
                            <Text style={styles.numberBadgeText}>{item.number}</Text>
                          </View>
                        ) : (
                          <View style={styles.neutralLabelBadge}>
                            <Text style={styles.neutralLabelBadgeText}>{item.label}</Text>
                          </View>
                        )}

                        {item.isNew && (
                          <View style={styles.newBadge}>
                            <View style={styles.newDot} />
                            <Text style={styles.newBadgeText}>New</Text>
                          </View>
                        )}
                      </View>

                      <View style={styles.cardDateRow}>
                        <Ionicons name="calendar-outline" size={12} color="#4A5568" />
                        <Text style={styles.dateText}>{item.date}</Text>

                        {item.offlineSaved && (
                          <View style={styles.offlineIconWrap}>
                            <TouchableOpacity
                              onPress={() => toggleOfflinePopover(item.id)}
                              style={styles.offlineIconBtn}
                              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                              activeOpacity={0.8}
                            >
                              <Ionicons name="cloud-done-outline" size={15} color="#22C55E" />
                            </TouchableOpacity>

                            {activeOfflinePopover === item.id && (
                              <View style={styles.offlinePopoverAnchor}>
                                <View style={styles.offlinePopover}>
                                  <View style={styles.offlinePopoverArrow} />
                                  <Text style={styles.offlinePopoverText}>Saved offline</Text>
                                </View>
                              </View>
                            )}
                          </View>
                        )}

                        <TouchableOpacity
                          onPress={() => toggleBookmark(item.id)}
                          style={styles.bookmarkBtn}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Ionicons
                            name={bookmarks[item.id] ? 'bookmark' : 'bookmark-outline'}
                            size={17}
                            color={bookmarks[item.id] ? '#4C8DFF' : '#4A5568'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={[styles.cardTitle, !item.isNew && styles.cardTitleRead]}>
                      {item.title}
                    </Text>

                    <View style={styles.cardDivider} />

                    <View style={styles.cardBtnsRow}>
                      <TouchableOpacity style={styles.pdfBtn} activeOpacity={0.85}>
                        <Ionicons name="document-text-outline" size={14} color="#FFFFFF" />
                        <Text style={styles.pdfBtnText}>Open PDF</Text>
                        <Ionicons name="open-outline" size={12} color="rgba(255,255,255,0.7)" />
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.explainBtn} activeOpacity={0.85}>
                        <Ionicons name="sparkles-outline" size={13} color="#94A3B8" />
                        <Text style={styles.explainBtnText}>Read explanation</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={onHome} activeOpacity={0.85}>
        <Ionicons name="home" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#080C10',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) + 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#111720',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  headerSpacer: { width: 42, height: 42 },
  headerTextWrap: { flex: 1, alignItems: 'center' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    color: '#4A5568',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3,
    letterSpacing: 0.2,
  },

  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 14,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E1420',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingRight: 12,
    overflow: 'hidden',
  },
  searchBarFocused: {
    borderColor: 'rgba(76,141,255,0.5)',
    backgroundColor: '#111827',
  },
  searchIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#12345C',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 13,
  },
  clearBtn: { padding: 2 },

  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: '#0E1420',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#12345C',
    borderColor: '#12345C',
  },
  tabText: { color: '#4A5568', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#FFFFFF', fontWeight: '700' },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 30,
  },
  emptyIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: '#0E1420',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#4A5568',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },

  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E1420',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  yearLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  yearIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: 'rgba(76,141,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearText: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  yearRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  yearCountBadge: {
    backgroundColor: 'rgba(76,141,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  yearCountText: {
    color: '#4C8DFF',
    fontSize: 12,
    fontWeight: '700',
  },
  yearCountLabel: {
    color: '#4A5568',
    fontSize: 13,
    fontWeight: '500',
  },

  card: {
    backgroundColor: '#0E1420',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  cardNew: {
    borderColor: 'rgba(45,212,191,0.18)',
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 6,
  },
  cardBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flex: 1,
    flexWrap: 'wrap',
  },
  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
  },

  numberBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },
  numberBadgeText: {
    color: '#94A3B8',
    fontSize: 11.5,
    fontWeight: '600',
  },
  neutralLabelBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },
  neutralLabelBadgeText: {
    color: '#94A3B8',
    fontSize: 11.5,
    fontWeight: '600',
  },

  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(34,197,94,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.25)',
    gap: 4,
  },
  newDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#22C55E',
  },
  newBadgeText: {
    color: '#22C55E',
    fontSize: 11.5,
    fontWeight: '700',
  },

  dateText: {
    color: '#4A5568',
    fontSize: 11.5,
    fontWeight: '500',
    marginLeft: 3,
  },
  bookmarkBtn: {
    marginLeft: 6,
    padding: 2,
  },

  offlineIconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    zIndex: 30,
  },
  offlineIconBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(34,197,94,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlinePopoverAnchor: {
    position: 'absolute',
    top: 30,
    left: -80,
    right: -46,
    zIndex: 50,
    alignItems: 'center',
  },
  offlinePopover: {
    minWidth: 98,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101821',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.28)',
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  offlinePopoverArrow: {
    position: 'absolute',
    top: -5,
    left: '50%',
    width: 10,
    height: 10,
    backgroundColor: '#101821',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(34,197,94,0.28)',
    transform: [{ translateX: -5 }, { rotate: '45deg' }],
  },
  offlinePopoverText: {
    color: '#22C55E',
    fontSize: 11.5,
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
     lineHeight: 14,
  },

  cardTitle: {
    color: '#E2E8F0',
    fontSize: 14.5,
    fontWeight: '600',
    lineHeight: 21,
    paddingLeft: 6,
    marginBottom: 12,
  },
  cardTitleRead: {
    color: '#94A3B8',
    fontWeight: '500',
  },

  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginHorizontal: -15,
    marginBottom: 12,
  },

  cardBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 6,
  },

  pdfBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12345C',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 22,
    gap: 6,
  },
  pdfBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  explainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 22,
    gap: 5,
  },
  explainBtnText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#12345C',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#12345C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
});