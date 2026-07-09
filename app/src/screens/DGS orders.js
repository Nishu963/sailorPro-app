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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ACCENT_COLOR = '#6495ED';

const COLORS = {
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSoft: '#F1F5F9',
  border: '#E2E8F0',

  // Premium blue outline that compliments primary #6495ED
  premiumBorder: 'rgba(37, 99, 235, 0.30)',
  premiumBorderSoft: 'rgba(100, 149, 237, 0.24)',

  text: '#0F172A',
  muted: '#64748B',
  mutedLight: '#94A3B8',
  green: '#16A34A',
  greenSoft: '#F0FDF4',
  blueSoft: '#EFF6FF',
};

const SOFT_SHADOW = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.07,
  shadowRadius: 18,
  elevation: 3,
};

const TINY_SHADOW = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.05,
  shadowRadius: 10,
  elevation: 2,
};

const CIRCULARS_DATA = {
  2026: [
    { id: 'n1', type: 'notice', label: 'Notice', title: 'DG Shipping Oral Exam Update', date: '02 Jul 2026', isNew: false, isRead: true, offlineSaved: true, pdfUrl: '#' },
    { id: 'c34', number: '34 of 2026', title: 'SMY Course Mandatory for All Indian Seafarers', date: '01 Jul 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c35', number: '35 of 2026', title: 'Commencement of Seat Booking for Nautical Grade Competency Oral Examinations – July 2026', date: '29 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c33', number: '33 of 2026', title: 'Precautionary Measures for Indian Seafarers operating in the Gulf Region', date: '26 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c32', number: '32 of 2026', title: 'Commencement of Seat Booking for Nautical Grade Competency Written Examinations – July 2026', date: '24 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c31', number: '31 of 2026', title: 'Precautionary Measures for Indian Seafarers in view of the Heightened Security Situation in the Gulf Region – reg.', date: '13 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c29', number: '29 of 2026', title: 'Instructions regarding mandatory submission of FAL Forms through Maritime Single Window (MSW) System.', date: '08 Jun 2026', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c28', number: '28 of 2026', title: 'Operationalisation of Oral Examination Booking on New  Examination  Portal   for   Candidates   Whose   Written   Examination   Results   Were   Declared   in       M...', date: '01 Jun 2026', isNew:true, isRead:false, offlineSaved: false, pdfUrl: '#' },
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
    { id: 'c56_25', number: '56 of 2025', title: 'Introduction  of  Revised  Form-I  (RPSL  -  for  Indian  seafarers  working  on  foreign  flag  vessels).  Form -        IA (RPSL/Indian ship owner – for Indian seafarers wo...', date: '11 Dec 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c46_25', number: '46 of 2025', title: 'Collision / Contact damage between Manta Nigar and Jag Radha at P and V anchorage, Mumbai on 02.08.2025', date: '07 Oct 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c43_25', number: '43 of 2025', title: 'Prevention of Forged Entries in Continuous Discharge Certificates (CDCs) by RPSL Agents / Shipping Companies /Seafarers - reg', date: '01 Oct 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c42_25', number: '42 of 2025', title: 'Death of seafarer due to fall from Crane Cabin', date: '30 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c41_25', number: '41 of 2025', title: 'Revised Course Curriculum for Chief Mate (NCV) Phase-I and Phase-II Course', date: '23 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c39_25', number: '39 of 2025', title: "Welfare Schemes Administered by Seafarers' Welfare Fund Society (SWFS) for Indian Seafarers", date: '18 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c36_25', number: '36 of 2025', title: 'Revised Course Curriculum for NWKO (NCV) Course', date: '10 Sept 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'crew_25', type: 'notice', label: 'Crew Annual', title: 'Crew Annual Report 2024-2025', date: '25 Aug 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
    { id: 'c31_25', number: '31 of 2025', title: 'Mandatory  compliance  measures  to  prevent  engagement of Seafarers without appropriate               training  and  demonstratable  competence prior is...', date: '18 Jul 2025', isNew: true, isRead: false, offlineSaved: false, pdfUrl: '#' },
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

  const toggleYear = year => {
    setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleBookmark = id => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOfflinePopover = id => {
    setActiveOfflinePopover(prev => (prev === id ? null : id));
  };

  const getFilteredCirculars = circulars => {
    return circulars
      .filter(c => {
        if (activeTab === 'bookmarked') return !!bookmarks[c.id];
        if (activeTab === 'unread') return !c.isRead;
        return true;
      })
      .filter(c => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          (c.number || '').toLowerCase().includes(q) ||
          (c.label || '').toLowerCase().includes(q)
        );
      });
  };

  const years = Object.keys(CIRCULARS_DATA).map(Number).sort((a, b) => b - a);
  const hasNoBookmarks = Object.values(bookmarks).every(v => !v);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.75}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
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
            <Ionicons name="search" size={16} color="#FFFFFF" />
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search circular title or month..."
            placeholderTextColor={COLORS.mutedLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={COLORS.mutedLight} />
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'bookmarked' && hasNoBookmarks ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="bookmark-outline" size={34} color={COLORS.mutedLight} />
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

            if ((activeTab === 'bookmarked' || activeTab === 'unread') && circulars.length === 0) {
              return null;
            }

            return (
              <View key={year}>
                <TouchableOpacity
                  style={styles.yearRow}
                  onPress={() => toggleYear(year)}
                  activeOpacity={0.8}
                >
                  <View style={styles.yearLeft}>
                    <View style={styles.yearIconWrap}>
                      <Ionicons name="time-outline" size={13} color={ACCENT_COLOR} />
                    </View>

                    <Text style={styles.yearText}>{year}</Text>
                  </View>

                  <View style={styles.yearRight}>
                    <View style={styles.yearCountBadge}>
                      <Text style={styles.yearCountText}>
                        {activeTab === 'all' ? CIRCULARS_DATA[year].length : circulars.length}
                      </Text>
                    </View>

                    <Text style={styles.yearCountLabel}>circulars</Text>

                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={15}
                      color={COLORS.mutedLight}
                      style={{ marginLeft: 6 }}
                    />
                  </View>
                </TouchableOpacity>

                {isExpanded &&
                  circulars.map(item => (
                    <View key={item.id} style={styles.card}>
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
                          <Ionicons name="calendar-outline" size={12} color={COLORS.mutedLight} />

                          <Text style={styles.dateText}>{item.date}</Text>

                          {item.offlineSaved && (
                            <View style={styles.offlineIconWrap}>
                              <TouchableOpacity
                                onPress={() => toggleOfflinePopover(item.id)}
                                style={styles.offlineIconBtn}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                activeOpacity={0.8}
                              >
                                <Ionicons name="cloud-done-outline" size={15} color={COLORS.green} />
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
                              color={bookmarks[item.id] ? ACCENT_COLOR : COLORS.mutedLight}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text
                        style={[styles.cardTitle, !item.isNew && styles.cardTitleRead]}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                      >
                        {item.title}
                      </Text>

                      <View style={styles.cardDivider} />

                      <View style={styles.cardBtnsRow}>
                        <TouchableOpacity style={styles.pdfBtn} activeOpacity={0.85}>
                          <Ionicons name="document-text-outline" size={14} color="#FFFFFF" />
                          <Text style={styles.pdfBtnText}>Open PDF</Text>
                          <Ionicons name="open-outline" size={12} color="rgba(255,255,255,0.72)" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.explainBtn} activeOpacity={0.85}>
                          <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color={COLORS.muted} />
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
    backgroundColor: COLORS.bg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) + 12,
    paddingBottom: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  headerSpacer: {
    width: 42,
    height: 42,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.2,
  },

  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 12,
  },

  searchBar: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 29,
    borderWidth: 1.4,
    borderColor: 'rgba(100, 149, 237, 0.30)',
    paddingRight: 14,
    ...SOFT_SHADOW,
  },

  searchBarFocused: {
    borderColor: ACCENT_COLOR,
    shadowColor: ACCENT_COLOR,
    shadowOpacity: 0.15,
    elevation: 5,
  },

  searchIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: ACCENT_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 11,
  },

  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 13,
  },

  clearBtn: {
    padding: 4,
  },

  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 9,
  },

  tab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    ...TINY_SHADOW,
  },

  tabActive: {
    backgroundColor: ACCENT_COLOR,
    borderColor: ACCENT_COLOR,
  },

  tabText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '800',
  },

  tabTextActive: {
    color: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 104,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 82,
    paddingHorizontal: 30,
  },

  emptyIconWrap: {
    width: 86,
    height: 86,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SOFT_SHADOW,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 8,
  },

  emptySubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '600',
  },

  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...TINY_SHADOW,
  },

  yearLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  yearIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: COLORS.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  yearText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '900',
  },

  yearRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },

  yearCountBadge: {
    backgroundColor: COLORS.blueSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  yearCountText: {
    color: ACCENT_COLOR,
    fontSize: 12,
    fontWeight: '900',
  },

  yearCountLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '700',
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    overflow: 'visible',

    borderWidth: 1.7,
    borderColor: COLORS.premiumBorder,

    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 6,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  cardBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    paddingRight: 8,
  },

  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
    paddingTop: 2,
  },

  numberBadge: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F8FBFF',
    borderWidth: 1.2,
    borderColor: COLORS.premiumBorderSoft,
  },

  numberBadgeText: {
    color: '#334155',
    fontSize: 11.5,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  neutralLabelBadge: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F8FBFF',
    borderWidth: 1.2,
    borderColor: COLORS.premiumBorderSoft,
  },

  neutralLabelBadgeText: {
    color: '#334155',
    fontSize: 11.5,
    fontWeight: '900',
  },

  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.greenSoft,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    gap: 6,
  },

  newDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.green,
  },

  newBadgeText: {
    color: COLORS.green,
    fontSize: 11.5,
    fontWeight: '900',
  },

  dateText: {
    color: COLORS.mutedLight,
    fontSize: 11.5,
    fontWeight: '800',
    marginLeft: 2,
  },

  bookmarkBtn: {
    marginLeft: 6,
    padding: 3,
  },

  offlineIconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    zIndex: 30,
  },

  offlineIconBtn: {
    width: 27,
    height: 27,
    borderRadius: 10,
    backgroundColor: COLORS.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  offlinePopoverAnchor: {
    position: 'absolute',
    top: 33,
    left: -74,
    right: -46,
    zIndex: 50,
    alignItems: 'center',
  },

  offlinePopover: {
    minWidth: 112,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    ...TINY_SHADOW,
  },

  offlinePopoverArrow: {
    position: 'absolute',
    top: -5,
    left: '50%',
    width: 10,
    height: 10,
    backgroundColor: COLORS.surface,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#BBF7D0',
    transform: [{ translateX: -5 }, { rotate: '45deg' }],
  },

  offlinePopoverText: {
    color: COLORS.green,
    fontSize: 11.5,
    fontWeight: '900',
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 14,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 15.8,
    fontWeight: '900',
    lineHeight: 23.5,
    marginBottom: 14,
    letterSpacing: -0.15,
  },

  cardTitleRead: {
    color: '#788597',
    fontWeight: '700',
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#D7E5FF',
    marginHorizontal: -16,
    marginBottom: 14,
  },

  cardBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  pdfBtn: {
    flex: 0,
    width: 140,
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 6,
    shadowColor: ACCENT_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 3,
  },

  pdfBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  explainBtn: {
    flex: 0,
    width: 140,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 5,
  },

  explainBtnText: {
    color: '#64748B',
    fontSize: 11.5,
    fontWeight: '900',
    flexShrink: 1,
    textAlign: 'center',
  },

  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: ACCENT_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ACCENT_COLOR,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 6,
  },
});