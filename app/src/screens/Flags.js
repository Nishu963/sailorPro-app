import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Needed only for the Alpha/Bravo forked "swallowtail" flag shape below.
// If not already in your project: expo install react-native-svg
import Svg, { Polygon } from 'react-native-svg';

// ---------------------------------------------------------------------------
// REAL FLAG IMAGE ASSETS — drop your PNG/JPG files anywhere in your project
// (e.g. an /assets/flags folder) and require() them here. Once a flag has an
// `image` set below in FLAGS, it renders that image instead of the drawn
// FlagGraphic — no other code needs to change.
// ---------------------------------------------------------------------------
const ALPHA_IMAGE = require('../assets/flags/alpha.png'); // <-- update this path to your Alpha asset

const ACCENT = '#6495ED';
const ACCENT_DARK = '#3E6FD9';
const DARK_NAVY = '#0F1E3D';
const BG = '#F3F5F9';
const CARD_BG = '#FFFFFF';
const BORDER = '#E6E9F0';
const TEXT_DARK = '#0F1E3D';
const TEXT_MUTED = '#8A93A6';
const ICON_BG = '#EAF0FD';

// ---------------------------------------------------------------------------
// DATA — replace with your API response if needed. Each flag's `pattern`
// drives the graphic below (see FlagGraphic). Meanings/descriptions are the
// standard International Code of Signals single-letter meanings.
// ---------------------------------------------------------------------------
const FLAGS = [
  {
    letter: 'A',
    name: 'ALPHA',
    meaning: 'I have a diver down; keep well clear at slow speed',
    description: 'Burgee flag, white at the hoist and blue at the fly.',
    image: ALPHA_IMAGE,
    pattern: { type: 'swallowtailSplit', colors: ['#FFFFFF', '#0033A0'] },
  },
  {
    letter: 'B',
    name: 'BRAVO',
    meaning: 'I am taking in, discharging, or carrying dangerous goods',
    description: 'Solid red swallow-tailed (burgee) flag.',
    pattern: { type: 'swallowtailSolid', colors: ['#C8102E'] },
  },
  {
    letter: 'C',
    name: 'CHARLIE',
    meaning: 'Yes (affirmative)',
    description: 'Five horizontal bands: blue, white, red, white, blue.',
    pattern: { type: 'hStripes', colors: ['#0033A0', '#FFFFFF', '#C8102E', '#FFFFFF', '#0033A0'] },
  },
  {
    letter: 'D',
    name: 'DELTA',
    meaning: 'Keep clear of me; I am maneuvering with difficulty',
    description: 'Three horizontal bands: yellow, blue, yellow.',
    pattern: { type: 'hStripes', colors: ['#FFD100', '#0033A0', '#FFD100'] },
  },
  {
    letter: 'E',
    name: 'ECHO',
    meaning: 'I am altering my course to starboard',
    description: 'Two horizontal bands: blue over red.',
    pattern: { type: 'hStripes', colors: ['#0033A0', '#C8102E'] },
  },
  {
    letter: 'F',
    name: 'FOXTROT',
    meaning: 'I am disabled; communicate with me',
    description: 'White flag with a red diamond (lozenge) at the centre.',
    pattern: { type: 'centerShape', bg: '#FFFFFF', shape: 'diamond', shapeColor: '#C8102E' },
  },
  {
    letter: 'G',
    name: 'GOLF',
    meaning: 'I require a pilot',
    description: 'Six vertical stripes, alternating yellow and blue.',
    pattern: {
      type: 'vStripes',
      colors: ['#FFD100', '#0033A0', '#FFD100', '#0033A0', '#FFD100', '#0033A0'],
    },
  },
  {
    letter: 'H',
    name: 'HOTEL',
    meaning: 'I have a pilot on board',
    description: 'Two vertical halves: white at the hoist, red at the fly.',
    pattern: { type: 'vStripes', colors: ['#FFFFFF', '#C8102E'] },
  },
  {
    letter: 'I',
    name: 'INDIA',
    meaning: 'I am altering my course to port',
    description: 'Yellow flag with a black disc (circle) at the centre.',
    pattern: { type: 'centerShape', bg: '#FFD100', shape: 'circle', shapeColor: '#000000' },
  },
  {
    letter: 'J',
    name: 'JULIETT',
    meaning: 'I am on fire and have dangerous cargo on board; keep well clear',
    description: 'Three vertical stripes: blue, white, blue.',
    pattern: { type: 'vStripes', colors: ['#0033A0', '#FFFFFF', '#0033A0'] },
  },
  {
    letter: 'K',
    name: 'KILO',
    meaning: 'I wish to communicate with you',
    description: 'Two vertical halves: yellow at the hoist, blue at the fly.',
    pattern: { type: 'vStripes', colors: ['#FFD100', '#0033A0'] },
  },
  {
    letter: 'L',
    name: 'LIMA',
    meaning: 'You should stop your vessel instantly',
    description: 'Checkered flag of yellow and black squares.',
    pattern: { type: 'quarters', colors: ['#FFD100', '#000000', '#000000', '#FFD100'] },
  },
  {
    letter: 'M',
    name: 'MIKE',
    meaning: 'My vessel is stopped and making no way through the water',
    description: 'Solid blue flag with a white St. Andrew\u2019s cross.',
    pattern: { type: 'saltire', bg: '#0033A0', barColor: '#FFFFFF' },
  },
  {
    letter: 'N',
    name: 'NOVEMBER',
    meaning: 'No (negative)',
    description: 'Checkered flag of blue and white squares.',
    pattern: { type: 'quarters', colors: ['#0033A0', '#FFFFFF', '#FFFFFF', '#0033A0'] },
  },
  {
    letter: 'O',
    name: 'OSCAR',
    meaning: 'Man overboard',
    description: 'Diagonally divided flag: red and yellow.',
    pattern: { type: 'diagonal', colorA: '#C8102E', colorB: '#FFD100' },
  },
  {
    letter: 'P',
    name: 'PAPA',
    meaning: 'All persons should report on board; vessel about to proceed to sea',
    description: 'Blue flag with a white rectangle at the centre (Blue Peter).',
    pattern: { type: 'border', borderColor: '#0033A0', innerColor: '#FFFFFF' },
  },
  {
    letter: 'Q',
    name: 'QUEBEC',
    meaning: 'My vessel is healthy and I request free pratique',
    description: 'Solid yellow flag.',
    pattern: { type: 'solid', colors: ['#FFD100'] },
  },
  {
    letter: 'R',
    name: 'ROMEO',
    meaning: 'Reserved / used in specific signal combinations',
    description: 'Red flag with a yellow cross through the centre.',
    pattern: { type: 'cross', bg: '#C8102E', barColor: '#FFD100' },
  },
  {
    letter: 'S',
    name: 'SIERRA',
    meaning: 'I am operating astern propulsion',
    description: 'White flag with a blue square at the centre.',
    pattern: { type: 'centerShape', bg: '#FFFFFF', shape: 'square', shapeColor: '#0033A0' },
  },
  {
    letter: 'T',
    name: 'TANGO',
    meaning: 'Keep clear of me; I am engaged in pair trawling',
    description: 'Three vertical stripes: red, white, blue.',
    pattern: { type: 'vStripes', colors: ['#C8102E', '#FFFFFF', '#0033A0'] },
  },
  {
    letter: 'U',
    name: 'UNIFORM',
    meaning: 'You are running into danger',
    description: 'Quartered flag of red and white.',
    pattern: { type: 'quarters', colors: ['#C8102E', '#FFFFFF', '#FFFFFF', '#C8102E'] },
  },
  {
    letter: 'V',
    name: 'VICTOR',
    meaning: 'I require assistance',
    description: 'White flag with a red St. Andrew\u2019s cross.',
    pattern: { type: 'saltire', bg: '#FFFFFF', barColor: '#C8102E' },
  },
  {
    letter: 'W',
    name: 'WHISKEY',
    meaning: 'I require medical assistance',
    description: 'Blue, white and red quartered flag.',
    pattern: { type: 'quarters', colors: ['#0033A0', '#C8102E', '#FFFFFF', '#0033A0'] },
  },
  {
    letter: 'X',
    name: 'X-RAY',
    meaning: 'Stop carrying out your intentions and watch for my signals',
    description: 'White flag with a blue vertical bar at the centre.',
    pattern: { type: 'centerShape', bg: '#FFFFFF', shape: 'rect', shapeColor: '#0033A0' },
  },
  {
    letter: 'Y',
    name: 'YANKEE',
    meaning: 'I am dragging my anchor',
    description: 'Diagonally divided flag: yellow and red.',
    pattern: { type: 'diagonal', colorA: '#FFD100', colorB: '#C8102E' },
  },
  {
    letter: 'Z',
    name: 'ZULU',
    meaning: 'I require a tug (fishing vessels: I am shooting nets)',
    description: 'Quartered flag of yellow, black, red and blue.',
    pattern: { type: 'quarters', colors: ['#FFD100', '#000000', '#0033A0', '#C8102E'] },
  },
];

// ---------------------------------------------------------------------------
// FLAG GRAPHIC — renders a simplified but recognisable version of each
// flag's pattern using plain Views (no image assets / no PNG setup needed).
// ---------------------------------------------------------------------------
function FlagGraphic({ pattern }) {
  switch (pattern.type) {
    case 'solid':
      return <View style={[styles.flagFill, { backgroundColor: pattern.colors[0] }]} />;

    case 'hStripes':
      return (
        <View style={[styles.flagFill, { flexDirection: 'column' }]}>
          {pattern.colors.map((c, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: c }} />
          ))}
        </View>
      );

    case 'vStripes':
      return (
        <View style={[styles.flagFill, { flexDirection: 'row' }]}>
          {pattern.colors.map((c, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: c }} />
          ))}
        </View>
      );

    case 'quarters':
      return (
        <View style={styles.flagFill}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: pattern.colors[0] }} />
            <View style={{ flex: 1, backgroundColor: pattern.colors[1] }} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: pattern.colors[2] }} />
            <View style={{ flex: 1, backgroundColor: pattern.colors[3] }} />
          </View>
        </View>
      );

    case 'centerShape': {
      const shapeBase = { backgroundColor: pattern.shapeColor };
      let shapeStyle = shapeBase;
      if (pattern.shape === 'circle') {
        shapeStyle = [shapeBase, { width: '36%', height: '36%', borderRadius: 999 }];
      } else if (pattern.shape === 'diamond') {
        shapeStyle = [shapeBase, { width: '42%', height: '42%', transform: [{ rotate: '45deg' }] }];
      } else if (pattern.shape === 'square') {
        shapeStyle = [shapeBase, { width: '38%', height: '38%' }];
      } else if (pattern.shape === 'rect') {
        shapeStyle = [shapeBase, { width: '20%', height: '70%' }];
      }
      return (
        <View style={[styles.flagFill, { backgroundColor: pattern.bg, alignItems: 'center', justifyContent: 'center' }]}>
          <View style={shapeStyle} />
        </View>
      );
    }

    case 'diagonal':
      return (
        <View style={[styles.flagFill, { backgroundColor: pattern.colorB, overflow: 'hidden' }]}>
          <View
            style={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              top: '-50%',
              left: '-50%',
              backgroundColor: pattern.colorA,
              transform: [{ rotate: '-35deg' }],
            }}
          />
        </View>
      );

    case 'cross':
      return (
        <View style={[styles.flagFill, { backgroundColor: pattern.bg }]}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '38%',
              height: '24%',
              backgroundColor: pattern.barColor,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '38%',
              width: '24%',
              backgroundColor: pattern.barColor,
            }}
          />
        </View>
      );

    case 'saltire':
      return (
        <View
          style={[
            styles.flagFill,
            { backgroundColor: pattern.bg, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
          ]}
        >
          <View
            style={{
              position: 'absolute',
              width: '160%',
              height: '20%',
              backgroundColor: pattern.barColor,
              transform: [{ rotate: '32deg' }],
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: '160%',
              height: '20%',
              backgroundColor: pattern.barColor,
              transform: [{ rotate: '-32deg' }],
            }}
          />
        </View>
      );

    case 'border':
      return (
        <View
          style={[
            styles.flagFill,
            { backgroundColor: pattern.borderColor, alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <View style={{ width: '68%', height: '52%', backgroundColor: pattern.innerColor }} />
        </View>
      );

    // Real forked "swallowtail" burgee shape (used by Alpha & Bravo),
    // split into two colors at the hoist/fly boundary.
    case 'swallowtailSplit':
      return (
        <View style={styles.flagFill}>
          <Svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none">
            <Polygon points="0,0 120,0 120,200 0,200" fill={pattern.colors[0]} />
            <Polygon
              points="120,0 300,0 172,100 300,200 120,200"
              fill={pattern.colors[1]}
            />
          </Svg>
        </View>
      );

    // Real forked "swallowtail" burgee shape, single solid color (Bravo).
    case 'swallowtailSolid':
      return (
        <View style={styles.flagFill}>
          <Svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none">
            <Polygon
              points="0,0 300,0 172,100 300,200 0,200"
              fill={pattern.colors[0]}
            />
          </Svg>
        </View>
      );

    default:
      return <View style={[styles.flagFill, { backgroundColor: '#DDDDDD' }]} />;
  }
}

const LETTERS = FLAGS.map((f) => f.letter);

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function FlagsScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [pickerVisible, setPickerVisible] = useState(false);

  const flag = useMemo(() => FLAGS[index], [index]);
  const isFirst = index === 0;
  const isLast = index === FLAGS.length - 1;

  const goPrev = () => !isFirst && setIndex((i) => i - 1);
  const goNext = () => !isLast && setIndex((i) => i + 1);

  const jumpToLetter = (letter) => {
    const i = FLAGS.findIndex((f) => f.letter === letter);
    if (i >= 0) setIndex(i);
    setPickerVisible(false);
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
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap} pointerEvents="none">
          <Text style={styles.headerTitle} numberOfLines={1}>
            Flags
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            International Code Flags
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigator card */}
        <View style={styles.card}>
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navBtn, isFirst && styles.navBtnDisabled]}
              onPress={goPrev}
              disabled={isFirst}
            >
              <Ionicons name="chevron-back" size={20} color={isFirst ? '#C7CCD9' : TEXT_DARK} />
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.navTitle}>
                {flag.letter} - {flag.name}
              </Text>
              <Text style={styles.navSubtitle}>
                {index + 1} of {FLAGS.length}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.navBtn, isLast && styles.navBtnDisabled]}
              onPress={goNext}
              disabled={isLast}
            >
              <Ionicons name="chevron-forward" size={20} color={isLast ? '#C7CCD9' : TEXT_DARK} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.jumpBtn}
            activeOpacity={0.7}
            onPress={() => setPickerVisible(true)}
          >
            <Ionicons name="navigate-outline" size={16} color={TEXT_DARK} />
            <Text style={styles.jumpBtnText}>Jump to Letter</Text>
            <Ionicons
              name={pickerVisible ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={TEXT_DARK}
            />
          </TouchableOpacity>
        </View>

        {/* Flag display card */}
        <View style={styles.flagGlowWrap}>
          <View style={styles.flagCard}>
            {flag.image ? (
              <Image source={flag.image} style={styles.flagFill} resizeMode="contain" />
            ) : (
              <FlagGraphic pattern={flag.pattern} />
            )}
            <View style={styles.flagInnerSheen} pointerEvents="none" />
            <View style={styles.flagChip}>
              <View style={styles.flagChipDot} />
              <Text style={styles.flagChipText}>
                {flag.letter} · {flag.name}
              </Text>
            </View>
          </View>
        </View>

        {/* Meaning card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeaderRow}>
            <View style={styles.infoIconBadge}>
              <Ionicons name="information-circle-outline" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.infoTitle}>Meaning</Text>
          </View>
          <Text style={styles.infoText}>{flag.meaning}</Text>
        </View>

        {/* Description card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeaderRow}>
            <View style={styles.infoIconBadge}>
              <Ionicons name="document-text-outline" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.infoTitle}>Flag Description</Text>
          </View>
          <Text style={styles.infoText}>{flag.description}</Text>
        </View>
      </ScrollView>

      {/* Floating home button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // Prefer popping back to the first screen in this stack (works
          // regardless of what that screen is named). Falls back to a
          // named "Home" route only if there's nothing to pop to.
          if (navigation.canGoBack()) {
            navigation.popToTop();
          } else {
            navigation.navigate('Home');
          }
        }}
      >
        <Ionicons name="home" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Jump to Letter bottom sheet */}
      <Modal
        visible={pickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPickerVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setPickerVisible(false)} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeaderRow}>
            <Text style={styles.sheetTitle}>Jump to Letter</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setPickerVisible(false)}
            >
              <Ionicons name="close" size={18} color={DARK_NAVY} />
            </TouchableOpacity>
          </View>

          <View style={styles.letterGrid}>
            {LETTERS.map((letter) => {
              const active = letter === flag.letter;
              return (
                <TouchableOpacity
                  key={letter}
                  style={[styles.letterCell, active && styles.letterCellActive]}
                  activeOpacity={0.7}
                  onPress={() => jumpToLetter(letter)}
                >
                  <Text
                    style={[styles.letterCellText, active && styles.letterCellTextActive]}
                  >
                    {letter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
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
    backgroundColor: ACCENT,
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK, textAlign: 'center' },
  headerSubtitle: { fontSize: 12, color: TEXT_MUTED, marginTop: 2, textAlign: 'center' },

  scrollContent: { paddingHorizontal: 16, paddingBottom: 120 },

  card: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    borderWidth: 1.3,
    borderColor: 'rgba(100, 149, 237, 0.35)',
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnDisabled: { opacity: 0.5 },
  navTitle: { fontSize: 16, fontWeight: '700', color: TEXT_DARK },
  navSubtitle: { fontSize: 12, color: TEXT_MUTED, marginTop: 2 },

  jumpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingVertical: 12,
  },
  jumpBtnText: { fontSize: 14, fontWeight: '700', color: TEXT_DARK },

  flagGlowWrap: {
    marginTop: 16,
    borderRadius: 28,
    padding: 6,
    backgroundColor: 'rgba(100, 149, 237, 0.22)',
  },
  flagCard: {
    aspectRatio: 3 / 2,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.3,
    borderColor: 'rgba(100, 149, 237, 0.35)',
  },
  flagInnerSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '38%',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  flagChip: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(15,30,61,0.62)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  flagChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
  },
  flagChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  flagFill: { flex: 1 },

  infoCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    borderWidth: 1.3,
    borderColor: 'rgba(100, 149, 237, 0.35)',
  },
  infoHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  infoIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: { fontSize: 15, fontWeight: '700', color: TEXT_DARK },
  infoText: { fontSize: 15, color: TEXT_DARK, lineHeight: 23 },

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

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(15,30,61,0.45)' },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 24,
    elevation: 12,
  },
  sheetHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D7DEEB',
    alignSelf: 'center',
    marginBottom: 18,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  sheetTitle: { fontSize: 19, fontWeight: '800', color: TEXT_DARK, letterSpacing: 0.2 },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Premium "keyboard" style letter grid — keycap look
  letterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
    justifyContent: 'center',
    paddingTop: 2,
  },
  letterCell: {
    width: '16%',
    aspectRatio: 1,
    minWidth: 48,
    maxWidth: 54,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEEF5',
    borderBottomWidth: 3,
    borderBottomColor: '#DDE2ED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  letterCellActive: {
    backgroundColor: 'rgba(100, 149, 237, 0.15)',
    borderWidth: 1.5,
    borderColor: ACCENT,
    borderBottomWidth: 1.5,
    borderBottomColor: ACCENT,
    shadowOpacity: 0,
    elevation: 0,
  },
  letterCellText: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  letterCellTextActive: { color: ACCENT_DARK, fontWeight: '800' },
});