import React, { useMemo, useState } from 'react';
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

const TOPICS = [
  {
    key: 'indos',
    title: 'INDoS',
    accent: '#4C8DFF',
    questions: [
      'What is INDoS?',
      'How to Apply For INDOS number?',
      'Fee for issuance of INDoS number',
      'For how many years INDOS is Valid?',
      'How to download INDoS certificate?',
      'How to cancel my INDoS?',
      'How can I delete a duplicate INDoS?',
      'How to reset my INDoS ID password?',
    ],
  },
  {
    key: 'stcw',
    title: 'STCW',
    accent: '#22C55E',
    questions: [
      'What is STCW course?',
      'What is the 3-tier system of the STCW course?',
      'What is successful completion of E-Learning Modules?',
      'Exit Exam Process',
      'How many attempts can be given for exit exam for a course?',
      'How to download STCW certificate?',
    ],
  },
  {
    key: 'cdc',
    title: 'CDC',
    accent: '#F59E0B',
    questions: [
      'What is Seaman book/CDC?',
      'What does CDC (Fresh / Renewal / Replacement) mean?',
      'What are all documents required to apply for CDC?',
      'How to apply for CDC (Fresh / Renewal / Replacement)?',
      'For how many years CDC is Valid?',
      'How to check the status of CDC?',
      'What to do if you lost the CDC?',
      'Who to contact for CDC/BSID issues?',
    ],
  },
  {
    key: 'sid',
    title: 'SID',
    accent: '#A855F7',
    questions: [
      'What is BSID?',
      'What are all documents needed to apply for BSID?',
      'Procedure to apply for BSID',
      'How to schedule appointment for applying BSID?',
      'How to track the status of BSID?',
      'What to do if you lost your BSID?',
      'Contact of concern authority if queries occured',
      'Who to contact for CDC/BSID issues?',
    ],
  },
  {
    key: 'dce',
    title: 'DCE',
    accent: '#EF4444',
    questions: [
      'How to apply for DCE?',
      'How to apply for Advance DCE?',
      'What is the difference between DCE and COP?',
      'What is the difference between Level 1/Level 2 DCE?',
      'Can I apply DCE in India with foreign CoC?',
      "What's needed level 2 DCE: experience or cargo?",
      'How to revalidate DCE?',
      'How to renew or apply multiple DCE at the same time?',
      'Is it necessary to upgarde cert. SCTW 1995 to 2010 standards?',
      'How many days will it take to obtain a new DCE?',
      'How to download DCE certificate?',
    ],
  },
  {
    key: 'coc',
    title: 'CoC',
    accent: '#06B6D4',
    questions: [
      'How to apply for CoC on e-Pariksha?',
      'How to apply for CoC on e-governance?',
      'How to pay fees for obtaining CoC/DCE from MMD?',
      'How to know the status of CoC regarding printed or dispatched?',
      'How to re-validate CoC?',
      'What are the documents rerquired for CoC revalidation?',
      'What to do if multiple CoCs appear for the same grade during revalidation?',
    ],
  },
  {
    key: 'cop',
    title: 'CoP',
    accent: '#EC4899',
    questions: [
      'What to do after receiving an email confirming CoP approval?',
      "What if there's no update after the CoP issuance process?",
      'How to get a lost CoP reissued?',
    ],
  },
  {
    key: 'egovernance',
    title: 'E-Governance',
    accent: '#84CC16',
    questions: [
      'What to do if fee status is pending in the e-governance portal?',
      'Who to contact for CDC/BSID issues?',
      'What should I do in case of an issue while updating course or sea service details in the seafarer profile?',
      'How to correct personal details in the seafarer profile?',
      'How to reset my Seafarer ID password?',
      'What to do if multiple CoCs appear for the same grade during revalidation?',
      'How to fix uploading a passport under the wrong tab?',
      'What to do after receiving an email confirming CoP approval?',
      "What if there's no update after the CoP issuance process?",
      'How to get a lost CoP reissued?',
    ],
  },
  {
    key: 'epariksha',
    title: 'E-Pariksha',
    accent: '#F97316',
    questions: [
      'How to fix upload issues on E-Pariksha?',
      'How to update E-Pariksha profile info?',
      'How to resolve "not approved/on hold" status?',
      'What if MEO-IV assessment is stuck?',
      'How to resolve stuck MEO exam payments?',
      'What if assessment payment is asked again?',
      'Should Part A fees be paid before Part B?',
      'What to do if payment fails?',
      "What if MEK-M is paid, but MEK-G isn't?",
      'How to confirm MEO exam bookings?',
    ],
  },
];

export default function DGProblemSolverScreen({ navigation, onBack }) {
  const [query, setQuery] = useState('');
  const [expandedKey, setExpandedKey] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation?.goBack?.();
    }
  };

  const toggleTopic = (key) => {
    setExpandedKey((current) => (current === key ? null : key));
  };

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 3) return null;

    const results = [];
    TOPICS.forEach((topic) => {
      topic.questions.forEach((question) => {
        if (question.toLowerCase().includes(q)) {
          results.push({ topicKey: topic.key, accent: topic.accent, question });
        }
      });
    });
    return results;
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E13" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>DG Problem Solver</Text>
          <Text style={styles.headerSubtitle}>DG Shipping</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
          <Ionicons name="search" size={18} color="#8B95A1" style={styles.searchIcon} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search any DG problem"
            placeholderTextColor="#64748B"
            value={query}
            onChangeText={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        <Text style={styles.searchHint}>
          Type at least 3 letters to search, or browse topics below.
        </Text>

        {searchResults ? (
          <>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionLabelText}>
                Results ({searchResults.length})
              </Text>
            </View>

            {searchResults.length === 0 ? (
              <Text style={styles.noResultsText}>No matching questions found.</Text>
            ) : (
              <View style={styles.topicCard}>
                {searchResults.map((result, index) => (
                  <TouchableOpacity
                    key={`${result.topicKey}-${index}`}
                    style={[
                      styles.questionRow,
                      index === searchResults.length - 1 && styles.questionRowLast,
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.questionDot, { backgroundColor: result.accent }]} />
                    <Text style={styles.questionText}>{result.question}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#5B6B7D" />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        ) : (
          <>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionLabelText}>Topics</Text>
            </View>

            {TOPICS.map((topic) => {
              const isExpanded = expandedKey === topic.key;

              return (
                <View key={topic.key} style={styles.topicCard}>
                  <TouchableOpacity
                    style={styles.topicHeader}
                    activeOpacity={0.75}
                    onPress={() => toggleTopic(topic.key)}
                  >
                    <View style={[styles.topicAccentBar, { backgroundColor: topic.accent }]} />

                    <Text style={styles.topicTitle}>{topic.title}</Text>

                    <View style={[styles.countBadge, { borderColor: topic.accent }]}>
                      <Text style={[styles.countBadgeText, { color: topic.accent }]}>
                        {topic.questions.length}
                      </Text>
                    </View>

                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color="#8B95A1"
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.questionList}>
                      <View style={styles.topicDivider} />

                      {topic.questions.map((question, index) => (
                        <TouchableOpacity
                          key={question}
                          style={[
                            styles.questionRow,
                            index === topic.questions.length - 1 && styles.questionRowLast,
                          ]}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.questionDot, { backgroundColor: topic.accent }]} />
                          <Text style={styles.questionText}>{question}</Text>
                          <Ionicons name="chevron-forward" size={16} color="#5B6B7D" />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0A0E13',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) + 14,
    paddingBottom: 20,
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#171B21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 46,
    height: 46,
  },
  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#7A8794',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12171E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  searchBarFocused: {
    borderColor: '#4C8DFF',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  searchHint: {
    color: '#6B7684',
    fontSize: 12.5,
    marginBottom: 20,
    fontWeight: '500',
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabelText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  noResultsText: {
    color: '#6B7684',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  topicCard: {
    backgroundColor: '#12171E',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  topicAccentBar: {
    width: 3,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  topicTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  countBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  countBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  topicDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 16,
  },
  questionList: {
    paddingBottom: 6,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  questionRowLast: {
    borderBottomWidth: 0,
  },
  questionDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 12,
  },
  questionText: {
    flex: 1,
    color: '#E7ECF2',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginRight: 8,
  },
});