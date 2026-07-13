import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  background: '#F5F7FC',
  white: '#FFFFFF',
  navy: '#102844',
  primary: '#6495ED',
  accent: '#1E7A8C',
  accentSoft: '#E3F1F3',
  text: '#142033',
  textStrong: '#101A2B',
  muted: '#6F7D8D',
  faint: '#A7B0BA',
  line: '#E3E8EF',
  chip: '#F0F4FF',
  shadow: '#8E99AA',
};

const CARD_ACCENT = '#1C6DFF';

const SECTIONS = [
  {
    id: 'a',
    label: 'A',
    title: 'Part A - General',
    rules: [
      'Rule 1 - Application',
      'Rule 2 - Responsibility',
      'Rule 3 - General Definitions',
    ],
  },
  {
    id: 'b',
    label: 'B',
    title: 'Part B - Steering And Sailing Rules',
    rules: [
      'Rule 4 - Application',
      'Rule 5 - Look-out',
      'Rule 6 - Safe Speed',
      'Rule 7 - Risk of Collision',
      'Rule 8 - Action to avoid Collision',
      'Rule 9 - Narrow Channels',
      'Rule 10 - Traffic Separation Schemes',
      'Rule 11 - Application',
      'Rule 12 - Sailing Vessels',
      'Rule 13 - Overtaking',
      'Rule 14 - Head-on Situation',
      'Rule 15 - Crossing Situation',
      'Rule 16 - Action by Give-way Vessel',
      'Rule 17 - Action by Stand-on Vessel',
      'Rule 18 - Responsibilities between Vessels',
      'Rule 19 - Conduct of Vessels in Restricted Visibility',
    ],
  },
  {
    id: 'c',
    label: 'C',
    title: 'Part C - Lights And Shapes',
    rules: [
      'Rule 20 - Application',
      'Rule 21 - Definitions',
      'Rule 22 - Visibility of Lights',
      'Rule 23 - Power-driven Vessels underway',
      'Rule 24 - Towing and Pushing',
      'Rule 25 - Sailing Vessels underway and Vessels under Oars',
      'Rule 26 - Fishing Vessels',
      'Rule 27 - Vessels not under Command or Restricted in their Ability to Manoeuvre',
      'Rule 27 - (b)(i) - Vessels not under command or restricted in their ability to manoeuvre',
      'Rule 28 - Vessel constrained by their draught',
      'Rule 29 - Pilot Vessels',
      'Rule 30 - Anchored Vessels and Vessels aground',
      'Rule 31 - Seaplanes',
    ],
  },
  {
    id: 'd',
    label: 'D',
    title: 'Part D - Sound And Light Signals',
    rules: [
      'Rule 32 - Definitions',
      'Rule 33 - Equipment for Sound Signals',
      'Rule 34 - Manoeuvring and Warning Signals',
      'Rule 35 - Sound Signals in restricted Visibility',
      'Rule 36 - Signals to attract Attention',
      'Rule 37 - Distress Signals',
    ],
  },
  {
    id: 'e',
    label: 'E',
    title: 'Part E - Exemptions',
    rules: ['Rule 38 - Exemptions'],
  },
  {
    id: 'f',
    label: 'F',
    title: 'Part F - Verification Of Compliance With The Provisions Of The Convention',
    rules: [
      'Rule 39 - (Added by Res.A.1085(28))',
      'Rule 40 - (Added by Res.A.1085(28))',
      'Rule 41 - (Added by Res.A.1085(28))',
    ],
  },
  {
    id: 'ann',
    label: 'ANN',
    title: 'Annexes',
    rules: [
      'Annex I - Positioning and technical details of lights and shapes',
      'Annex II - Additional signals for fishing vessels fishing in close proximity',
      'Annex III - Technical details of sound signal appliances',
      'Annex IV - Distress signals',
    ],
  },
];

export default function RORScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [expandedId, setExpandedId] = useState('');

  const horizontalPadding = width >= 700 ? 28 : 18;
  const contentWidth = Math.min(width - horizontalPadding * 2, 760);

  const goHome = () => navigation?.navigate?.('CollegeCorner');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={[styles.header, { paddingTop: insets.top + 18, paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.headerInner, { maxWidth: contentWidth }]}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            onPress={() => navigation?.goBack?.()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Feather name="arrow-left" size={20} color={COLORS.accent} />
          </Pressable>

          <View style={styles.titleWrap}>
            <Text style={styles.title}>ROR</Text>
            <Text style={styles.subtitle}>Rules of the Road</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: insets.bottom + 235,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentInner, { maxWidth: contentWidth }]}>
          {SECTIONS.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              index={index}
              expanded={expandedId === section.id}
              onPress={() => setExpandedId((current) => (current === section.id ? '' : section.id))}
            />
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.homeButton,
          { bottom: insets.bottom + 38, right: horizontalPadding + 10 },
          pressed && styles.pressed,
        ]}
        onPress={goHome}
        accessibilityRole="button"
        accessibilityLabel="Go home"
      >
        <Feather name="home" size={30} color={COLORS.white} />
      </Pressable>
    </View>
  );
}

function SectionCard({ section, expanded, onPress }) {
  return (
    <View style={[styles.sectionCard, expanded && styles.sectionCardOpen]}>
      <View
        pointerEvents="none"
        style={[
          styles.cBorder,
          { borderColor: `${CARD_ACCENT}33` },
          expanded && [styles.cBorderOpen, { borderColor: `${CARD_ACCENT}33` }],
        ]}
      />

      <View style={styles.headerRow}>
        <Pressable
          style={({ pressed }) => [styles.sectionHeader, pressed && styles.headerPressed]}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`${section.title} ${expanded ? 'expanded' : 'collapsed'}`}
        >
          <Text style={styles.sectionTitle} numberOfLines={3}>
            {section.title}
          </Text>

          <View style={styles.chevronWrap}>
            <Feather
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={CARD_ACCENT}
            />
          </View>
        </Pressable>
      </View>

      {expanded && (
        <View style={styles.rulesWrap}>
          {section.rules.map((rule) => (
            <Pressable
              key={rule}
              style={({ pressed }) => [styles.ruleRow, pressed && styles.rulePressed]}
              accessibilityRole="button"
            >
              <Text style={styles.ruleText} numberOfLines={2}>
                {rule}
              </Text>
              <Feather name="chevron-right" size={17} color={COLORS.faint} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },

  headerInner: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDF2FB',
    borderWidth: 1,
    borderColor: '#E1E9F7',
  },

  titleWrap: {
    alignItems: 'center',
  },

  title: {
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '800',
    letterSpacing: 0.3,
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 12.5,
    lineHeight: 16,
    fontWeight: '600',
    color: COLORS.muted,
  },

  headerSpacer: {
    width: 44,
    height: 44,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    backgroundColor: COLORS.background,
  },

  contentInner: {
    width: '100%',
    alignSelf: 'center',
  },

  sectionCard: {
    position: 'relative',
    overflow: 'visible',
    marginBottom: 15,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#3E5A85',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  sectionCardOpen: {
    paddingBottom: 16,
    shadowOpacity: 0.14,
  },

  cBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderRadius: 16,
  },

  cBorderOpen: {
    borderWidth: 2.5,
  },

  headerRow: {
    position: 'relative',
  },

  sectionHeader: {
    minHeight: 74,
    paddingLeft: 26,
    paddingRight: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerPressed: {
    backgroundColor: '#F6F8FC',
  },

  sectionTitle: {
    flex: 1,
    marginRight: 10,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    letterSpacing: 0.1,
    color: COLORS.textStrong,
  },

  chevronWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rulesWrap: {
    paddingHorizontal: 22,
  },

  ruleRow: {
    minHeight: 46,
    marginTop: 9,
    paddingLeft: 16,
    paddingRight: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#FAFBFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rulePressed: {
    backgroundColor: '#F0F4FA',
  },

  ruleText: {
    flex: 1,
    marginRight: 10,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '600',
    color: '#4B5768',
  },

  homeButton: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});