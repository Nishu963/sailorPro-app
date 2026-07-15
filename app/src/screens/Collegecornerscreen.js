import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const COLORS = {
  white: '#FFFFFF',
  background: '#FCFCFD',

  navy: '#102844',
  navySoft: '#49627E',
  cornflowerBlue: '#6495ED',
  cornflowerTint: '#F3F7FE',
  cornflowerBorder: '#BBD1F5',

  gold: '#D9A84E',
  goldDark: '#A87826',
  goldTint: '#FFF6E3',
  goldBorder: '#EEDDBB',

  textDark: '#172033',
  textMuted: '#7D899B',
  textFaint: '#AEB7C5',

  border: '#E6EAF0',
  borderSoft: '#F0F2F6',

  cardBorder: '#E4E7EC',
  cardShadow: '#98A2B3',
};

// Shared soft outline color for topic/program cards — lower opacity version of
// the old solid '#D9DFFF' border, so the outline reads as subtle instead of harsh.
const SOFT_INDIGO_BORDER = 'rgba(89, 118, 232, 0.08)';

const TOPICS = [
  {
    id: 'ror',
    title: 'ROR (Rules of the Road)',
    routeName: 'ROR',
    icon: 'book-open',
    color: '#5876E8',
    tint: '#EEF0FF',
    iconBorder: SOFT_INDIGO_BORDER,
  },
  {
    id: 'papers',
    title: 'Past Year Papers',
    routeName: 'PastYearPapers',
    icon: 'file-text',
    color: '#5876E8',
    tint: '#EEF0FF',
    iconBorder: SOFT_INDIGO_BORDER,
  },
  {
    id: 'flags',
    title: 'Flags',
    routeName: 'Flags',
    icon: 'flag',
    color: '#5876E8',
    tint: '#EEF0FF',
    iconBorder: SOFT_INDIGO_BORDER,
  },
  {
    id: 'morse',
    title: 'Morse Code',
    routeName: 'MorseCode',
    icon: 'radio',
    color: '#5876E8',
    tint: '#EEF0FF',
    iconBorder: SOFT_INDIGO_BORDER,
  },
  {
    id: 'videos',
    title: 'Free Trial Videos',
    routeName: 'FreeTrial',
    icon: 'play-circle',
    color: '#5876E8',
    tint: '#EEF0FF',
    iconBorder: SOFT_INDIGO_BORDER,
  },
  {
    id: 'sstp',
    title: 'SSTP (Structured Shipboard Training Programme)',
    routeName: 'SSTP',
    icon: 'box',
    color: '#5876E8',
    tint: '#EEF0FF',
    iconBorder: SOFT_INDIGO_BORDER,
  },
];

const FULL_WIDTH_ITEM = {
  id: 'onboard',
  title: 'Onboard Familiarization (FREE - Common Module)',
  routeName: 'OnboardFamiliarization',
  icon: 'play-circle',
  color: '#5876E8',
  tint: '#EEF0FF',
  iconBorder: SOFT_INDIGO_BORDER,
};

export default function CollegeCornerScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');

  const horizontalPadding = width >= 700 ? 28 : 18;

  const contentWidth = Math.min(width - horizontalPadding * 2, 760);

  const filteredTopics = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return TOPICS;
    }

    return TOPICS.filter((topic) => topic.title.toLowerCase().includes(value));
  }, [search]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 8, paddingHorizontal: horizontalPadding },
        ]}
      >
        <View style={[styles.headerInner, { maxWidth: contentWidth }]}>
          <View style={styles.headerRow}>
            <Pressable
              style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
              onPress={() => navigation?.goBack?.()}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Feather name="arrow-left" size={18} color={COLORS.navy} />
            </Pressable>

            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle}>College Corner</Text>
              <Text style={styles.headerSubtitle}>PROGRAMS &amp; RESOURCES</Text>
            </View>

            <View style={styles.headerPlaceholder} />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
          <View style={[styles.contentInner, { maxWidth: contentWidth }]}>
            {/* Search bar — icon background is now the primary color */}
            <View style={styles.searchBar}>
              <View style={styles.searchIconWrap}>
                <Feather name="search" size={16} color={COLORS.white} />
              </View>

              <TextInput
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                placeholder="Search topics, papers, modules..."
                placeholderTextColor={COLORS.textFaint}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                selectionColor={COLORS.cornflowerBlue}
              />

              {search.length > 0 && (
                <Pressable
                  style={({ pressed }) => [styles.clearButton, pressed && styles.buttonPressed]}
                  onPress={() => setSearch('')}
                  hitSlop={6}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                >
                  <Feather name="x" size={14} color={COLORS.textMuted} />
                </Pressable>
              )}
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.eyebrow}>PROGRAM</Text>
                <Text style={styles.sectionSubtitle}>Tap below to switch between programs</Text>
              </View>

              <View style={styles.sectionLine} />
            </View>

            {/* DNS — styled as a distinct "active tab", bigger and color-filled unlike the white list cards below */}
            <Pressable
              style={({ pressed }) => [styles.programCard, pressed && styles.cardPressed]}
            >
              <View style={styles.programGlow} />

              <View style={styles.programIconWrap}>
                <Feather name="compass" size={17} color="#5876E8" />
              </View>

              <View style={styles.programTextWrap}>
                <View style={styles.activeTag}>
                  <Text style={styles.activeTagText}>ACTIVE PROGRAM</Text>
                </View>
                <Text style={styles.programTitle}>DNS</Text>
                <Text style={styles.programSubtitle}>7 items in this program</Text>
              </View>

              <View style={styles.programRight}>
                <View style={styles.totalPill}>
                  <Text style={styles.totalPillText}>6 total</Text>
                </View>

                <View style={styles.programArrow}>
                  <Feather name="chevron-down" size={15} color={COLORS.navy} />
                </View>
              </View>
            </Pressable>

            {/* Single-column list — Onboard card rendered with the exact same TopicCard styling, as the last item */}
            <View style={styles.topicList}>
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onPress={topic.routeName ? () => navigation?.navigate?.(topic.routeName) : undefined}
                />
              ))}
              <TopicCard
                topic={FULL_WIDTH_ITEM}
                onPress={() => navigation?.navigate?.(FULL_WIDTH_ITEM.routeName)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function TopicCard({ topic, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.topicCard,
        { borderColor: topic.iconBorder },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.topicGlow, { backgroundColor: topic.tint }]} />

      <View style={[styles.topicIconOuter, { backgroundColor: topic.tint, borderColor: topic.iconBorder }]}>
        <View style={[styles.topicIconWrap, { backgroundColor: topic.tint }]}>
          <Feather name={topic.icon} size={19} color={topic.color} />
        </View>
      </View>

      <View style={styles.topicTextWrap}>
        <Text style={styles.topicTitle} numberOfLines={2}>
          {topic.title}
        </Text>
      </View>

      <View style={[styles.topicArrow, { backgroundColor: topic.tint, borderColor: topic.iconBorder }]}>
        <Feather name="chevron-right" size={17} color={topic.color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 28,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingBottom: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSoft,
  },

  headerInner: {
    width: '100%',
    alignSelf: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  headerPlaceholder: {
    width: 38,
    height: 38,
  },

  headerTextWrap: {
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: -0.3,
    color: COLORS.textDark,
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: COLORS.cornflowerBlue,
  },

  content: {
    width: '100%',
    backgroundColor: COLORS.background,
  },

  contentInner: {
    width: '100%',
    alignSelf: 'center',
  },

  // Search bar — icon container now uses the primary color as background
  searchBar: {
    height: 52,
    marginTop: 16,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F7',
    borderWidth: 1,
    borderColor: '#E5E8EE',
  },

  searchIconWrap: {
    width: 38,
    height: 38,
    marginRight: 7,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cornflowerBlue,
    shadowColor: COLORS.cornflowerBlue,
    shadowOpacity: 0.28,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    paddingHorizontal: 2,
    fontSize: 13.5,
    fontWeight: '600',
    color: COLORS.textDark,
  },

  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },

  sectionHeader: {
    marginTop: 22,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  eyebrow: {
    marginBottom: 4,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: COLORS.cornflowerBlue,
  },

  sectionSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textMuted,
  },

  sectionLine: {
    flex: 1,
    height: 1,
    marginLeft: 14,
    marginBottom: 6,
    backgroundColor: COLORS.border,
  },

  // DNS "active tab" — purple theme (matches topic cards), larger than list cards.
  // Outline now uses the soft rgba indigo border instead of the solid '#D9DFFF'.
  programCard: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 118,
    marginBottom: 22,
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',

    borderWidth: 1.5,
    borderColor: SOFT_INDIGO_BORDER,
    backgroundColor: COLORS.white,

    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 9 },
    elevation: 5,
  },

  programGlow: {
    position: 'absolute',
    top: -55,
    right: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EEF0FF',
  },

  programIconWrap: {
    width: 42,
    height: 42,
    marginRight: 13,
    marginTop: 26,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0FF',
    borderWidth: 1,
    borderColor: SOFT_INDIGO_BORDER,
  },

  programTextWrap: {
    zIndex: 2,
    flex: 1,
  },

  activeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
    borderRadius: 8,
    backgroundColor: '#EEF0FF',
  },

  activeTagText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#5876E8',
  },

  programTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
    color: COLORS.textDark,
  },

  programSubtitle: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textMuted,
  },

  programRight: {
    zIndex: 2,
    marginLeft: 8,
    marginTop: 22,
    alignItems: 'flex-end',
  },

  totalPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 6,
    borderRadius: 12,
    backgroundColor: '#EEF0FF',
    borderWidth: 1,
    borderColor: SOFT_INDIGO_BORDER,
  },

  totalPillText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: COLORS.navySoft,
  },

  programArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0FF',
    borderWidth: 1,
    borderColor: SOFT_INDIGO_BORDER,
  },

  topicList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Topic cards — fancy styling restored: glow blob, nested icon box, per-topic colored border/shadow.
  // borderColor for these comes from topic.iconBorder (now SOFT_INDIGO_BORDER) at render time.
  topicCard: {
    position: 'relative',
    overflow: 'hidden',
    width: '48.5%',
    minHeight: 126,
    marginBottom: 12,
    paddingHorizontal: 13,
    paddingVertical: 13,
    borderRadius: 22,
    justifyContent: 'space-between',

    borderWidth: 1.3,
    backgroundColor: COLORS.white,

    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.14,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  topicGlow: {
    position: 'absolute',
    top: -42,
    right: -44,
    width: 105,
    height: 105,
    borderRadius: 53,
    opacity: 0.4,
  },

  topicIconOuter: {
    zIndex: 2,
    width: 52,
    height: 52,
    marginBottom: 12,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  topicIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topicTextWrap: {
    zIndex: 2,
    width: '100%',
    paddingRight: 22,
  },

  topicTitle: {
    fontSize: 12.5,
    lineHeight: 16,
    fontWeight: '900',
    color: '#0B1220',
  },

  topicArrow: {
    position: 'absolute',
    top: 13,
    right: 13,
    zIndex: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  cardPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.985 }],
  },
});
