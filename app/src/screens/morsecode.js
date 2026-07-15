import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as Clipboard from 'expo-clipboard';

const ACCENT = '#6495ED';
const DARK_NAVY = '#0F1E3D';
const BG = '#FCFCFD'; // matches College Corner (home) screen background
const CARD_BG = '#FFFFFF';
const BORDER = '#E6E9F0';
const TEXT_DARK = '#0F1E3D';
const TEXT_MUTED = '#8A93A6';
const CHIP_BG = '#E8EEFC';
const ICON_BG = '#EAF0FD';
const HOME_BG = '#FCFCFD'; // matches College Corner (home) screen background
const HOME_ICON_BG = '#EEF0FF'; // matches College Corner (home) screen topic icon background

// Chart grid — fixed 4-column layout so every cell lines up regardless of
// how wide its morse code text is (e.g. ".----" vs ".").
const CHART_COLUMNS = 4;
const CHART_GAP = 10;

// ---------------------------------------------------------------------------
// DATA — standard International Morse code for A-Z and 0-9. Order here is
// exactly what the Chart tab displays (letters first, then digits).
// ---------------------------------------------------------------------------
const CHART_ITEMS = [
  { char: 'A', code: '.-' },
  { char: 'B', code: '-...' },
  { char: 'C', code: '-.-.' },
  { char: 'D', code: '-..' },
  { char: 'E', code: '.' },
  { char: 'F', code: '..-.' },
  { char: 'G', code: '--.' },
  { char: 'H', code: '....' },
  { char: 'I', code: '..' },
  { char: 'J', code: '.---' },
  { char: 'K', code: '-.-' },
  { char: 'L', code: '.-..' },
  { char: 'M', code: '--' },
  { char: 'N', code: '-.' },
  { char: 'O', code: '---' },
  { char: 'P', code: '.--.' },
  { char: 'Q', code: '--.-' },
  { char: 'R', code: '.-.' },
  { char: 'S', code: '...' },
  { char: 'T', code: '-' },
  { char: 'U', code: '..-' },
  { char: 'V', code: '...-' },
  { char: 'W', code: '.--' },
  { char: 'X', code: '-..-' },
  { char: 'Y', code: '-.--' },
  { char: 'Z', code: '--..' },
  { char: '0', code: '-----' },
  { char: '1', code: '.----' },
  { char: '2', code: '..---' },
  { char: '3', code: '...--' },
  { char: '4', code: '....-' },
  { char: '5', code: '.....' },
  { char: '6', code: '-....' },
  { char: '7', code: '--...' },
  { char: '8', code: '---..' },
  { char: '9', code: '----.' },
];

const CHAR_TO_MORSE = CHART_ITEMS.reduce((acc, item) => {
  acc[item.char] = item.code;
  return acc;
}, {});

const MORSE_TO_CHAR = CHART_ITEMS.reduce((acc, item) => {
  acc[item.code] = item.char;
  return acc;
}, {});

function textToMorse(text) {
  return text
    .trim()
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      word
        .split('')
        .map((ch) => CHAR_TO_MORSE[ch] || '')
        .filter(Boolean)
        .join(' ')
    )
    .join(' / ');
}

function morseToText(morse) {
  return morse
    .trim()
    .split('/')
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((code) => MORSE_TO_CHAR[code] || '')
        .join('')
    )
    .join(' ');
}

const TABS = [
  { id: 'chart', label: 'Chart', icon: 'grid-outline' },
  { id: 'encode', label: 'Encode', icon: 'arrow-forward' },
  { id: 'decode', label: 'Decode', icon: 'arrow-back' },
];

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function MorseCodeScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState('chart');
  const [copiedChar, setCopiedChar] = useState(null);
  const [chartGridWidth, setChartGridWidth] = useState(0);

  const [encodeInput, setEncodeInput] = useState('');
  const [decodeInput, setDecodeInput] = useState('');

  const chartCellWidth =
    chartGridWidth > 0
      ? (chartGridWidth - CHART_GAP * (CHART_COLUMNS - 1)) / CHART_COLUMNS
      : undefined;

  const morseOutput = useMemo(() => textToMorse(encodeInput), [encodeInput]);
  const textOutput = useMemo(() => morseToText(decodeInput), [decodeInput]);

  const copyChartItem = async (item) => {
    try {
      await Clipboard.setStringAsync(item.code);
      setCopiedChar(item.char);
      setTimeout(() => {
        setCopiedChar((prev) => (prev === item.char ? null : prev));
      }, 1200);
    } catch (e) {
      // no-op — clipboard just won't update on failure
    }
  };

  const copyText = async (value) => {
    if (!value) return;
    try {
      await Clipboard.setStringAsync(value);
    } catch (e) {
      // no-op
    }
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
            Morse Code
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            Encode / Decode / Chart
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Tab switcher */}
        <View style={styles.tabRow}>
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <TouchableOpacity
                key={t.id}
                style={[styles.tabBtn, active && styles.tabBtnActive]}
                activeOpacity={0.7}
                onPress={() => setTab(t.id)}
              >
                <Ionicons
                  name={t.icon}
                  size={15}
                  color={active ? TEXT_DARK : TEXT_MUTED}
                />
                <Text style={[styles.tabBtnText, active && styles.tabBtnTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CHART TAB */}
        {tab === 'chart' && (
          <View style={[styles.card, styles.chartCard]}>
            <Text style={styles.chartCardTitle}>International Morse</Text>
            <Text style={styles.cardSubtitle}>Tap any character to copy its code.</Text>

            <View
              style={styles.chartGrid}
              onLayout={(e) => setChartGridWidth(e.nativeEvent.layout.width)}
            >
              {CHART_ITEMS.map((item) => {
                const copied = copiedChar === item.char;
                return (
                  <TouchableOpacity
                    key={item.char}
                    style={[
                      styles.chartCell,
                      chartCellWidth != null && { width: chartCellWidth },
                      copied && styles.chartCellCopied,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => copyChartItem(item)}
                  >
                    {/* Letter always stays plain black — only the code
                        flips to ACCENT when the cell is copied. */}
                    <Text style={styles.chartChar}>
                      {item.char}
                    </Text>
                    <Text style={[styles.chartCode, copied && styles.chartTextCopied]}>
                      {item.code}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ENCODE TAB */}
        {tab === 'encode' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Text -&gt; Morse</Text>
            <Text style={styles.cardSubtitle}>
              Spaces become <Text style={styles.inlineAccent}>/</Text> between words.
            </Text>

            <Text style={styles.fieldLabel}>ENTER TEXT</Text>
            <TextInput
              value={encodeInput}
              onChangeText={setEncodeInput}
              style={styles.input}
              placeholder="Example: SOS MAYDAY"
              placeholderTextColor={TEXT_MUTED}
              multiline
              autoCapitalize="characters"
            />

            <View style={styles.outputHeaderRow}>
              <Text style={styles.fieldLabel}>MORSE OUTPUT</Text>
              <TouchableOpacity
                style={styles.copyBtn}
                activeOpacity={0.7}
                onPress={() => copyText(morseOutput)}
              >
                <Ionicons name="copy-outline" size={14} color={TEXT_DARK} />
                <Text style={styles.copyBtnText}>Copy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.outputBox}>
              <Text style={styles.outputText} selectable>
                {morseOutput || ' '}
              </Text>
            </View>
          </View>
        )}

        {/* DECODE TAB */}
        {tab === 'decode' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Morse -&gt; Text</Text>
            <Text style={styles.cardSubtitle}>
              Letters separated by spaces. Words by <Text style={styles.inlineAccent}>/</Text>.
            </Text>

            <Text style={styles.fieldLabel}>ENTER MORSE</Text>
            <TextInput
              value={decodeInput}
              onChangeText={setDecodeInput}
              style={styles.input}
              placeholder="... --- ... / -- .- -.-- -.. .- -.--"
              placeholderTextColor={TEXT_MUTED}
              multiline
            />

            <View style={styles.outputHeaderRow}>
              <Text style={styles.fieldLabel}>TEXT OUTPUT</Text>
              <TouchableOpacity
                style={styles.copyBtn}
                activeOpacity={0.7}
                onPress={() => copyText(textOutput)}
              >
                <Ionicons name="copy-outline" size={14} color={TEXT_DARK} />
                <Text style={styles.copyBtnText}>Copy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.outputBox}>
              <Text style={styles.outputText} selectable>
                {textOutput || ' '}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating home button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.popToTop();
          } else {
            navigation.navigate('Home');
          }
        }}
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK, textAlign: 'center' },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: ACCENT,
    marginTop: 2,
    textAlign: 'center',
  },

  scrollContent: { paddingHorizontal: 16, paddingBottom: 120 },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#EEF1F6',
  },
  tabBtnActive: {
    backgroundColor: 'rgba(100, 149, 237, 0.12)', // ACCENT (home button color) at low opacity
    borderColor: ACCENT,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  tabBtnText: { fontSize: 13, fontWeight: '700', color: TEXT_MUTED },
  tabBtnTextActive: { color: TEXT_DARK },

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
  chartCard: { backgroundColor: HOME_BG },
  cardTitle: { fontSize: 17, fontWeight: '800', color: TEXT_DARK, letterSpacing: 0.1 },
  chartCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: ACCENT,
    letterSpacing: 0.1,
  },
  cardSubtitle: { fontSize: 13, color: TEXT_MUTED, marginTop: 4 },
  inlineAccent: { color: TEXT_DARK, fontWeight: '700' },

  // Chart grid
  chartGrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chartCell: {
    width: '23%',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: HOME_ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCellCopied: {
    backgroundColor: CHIP_BG,
    borderColor: ACCENT,
  },
  chartChar: {
    fontSize: 16,
    fontWeight: '800',
    color: TEXT_DARK,
    textAlign: 'center',
    lineHeight: 18,
  },
  chartCode: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
    marginTop: 2,
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 16,
  },
  // Highlight color for the code line when the cell is copied.
  chartTextCopied: { color: ACCENT },

  // Encode / Decode
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: TEXT_MUTED,
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    minHeight: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#F7F8FB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: TEXT_DARK,
    textAlignVertical: 'top',
  },
  outputHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#F7F8FB',
  },
  copyBtnText: { fontSize: 12.5, fontWeight: '700', color: TEXT_DARK },
  outputBox: {
    marginTop: 8,
    minHeight: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: HOME_ICON_BG,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  outputText: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_NAVY,
    letterSpacing: 1,
  },

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