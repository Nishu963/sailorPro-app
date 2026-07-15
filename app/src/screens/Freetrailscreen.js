import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// ---- Design tokens (light theme — same as original) ----
const ACCENT = '#6495ED';
const DARK_NAVY = '#0F1E3D';
const ARROW_COLOR = '#0c59f3'; // change this to update ONLY the expand/collapse arrow color
const ICON_BG = '#EAF0FD';
const ICON_BG_ACTIVE = 'rgba(100, 149, 237, 0.22)'; // highlighted topic icon (active/recent)
const BG = '#F4F6FB';
const CARD_BORDER = 'rgba(15, 30, 61, 0.08)';
const TOPIC_CARD_BORDER = 'rgba(100, 149, 237, 0.35)';
const SUBTEXT = '#7C8798';
const PROGRESS_TRACK = 'rgba(15, 30, 61, 0.08)';
const VIDEO_ROW_BG = '#FBFCFE';

// ---- Data: Deck Preparation Videos ----
const TOPICS = [
  {
    id: 't1',
    title: 'Rules of the Road and Lights and Sound Signals',
    videos: [
      { title: 'Part B Section I Rule 4 Application & 5 Look Out' },
      { title: 'Rule 13 Overtaking' },
      { title: 'Rule 14 Head on Situation' },
      { title: 'Rule 15 Crossing Situation' },
      { title: 'Rule 16 Action by Give Way Vessel' },
      { title: 'Rule 17 Action by Stand on Vessel' },
    ],
  },
  {
    id: 't2',
    title: 'Navigation & Bridge Work',
    videos: [
      { title: 'Basics of Keeping a Good Lookout' },
      { title: 'Basics of Taking Bearings' },
      { title: 'Familiarisation with Flags' },
    ],
  },
  {
    id: 't3',
    title: 'Operational Tasks',
    videos: [
      { title: 'Familiarisation with Takings Soundings on Ships' },
      { title: 'Bunker Barge Alongside and Hose Connection' },
      { title: 'Introduction to Corrosion' },
      { title: 'What Is Ballast Water?' },
      { title: 'Familiarisation with the Hydrometer' },
    ],
  },
  {
    id: 't4',
    title: 'Life Saving Appliances (LSA)',
    videos: [
      // TODO: replace with actual titles — not visible in reference screenshots
      { title: 'Video 1' },
      { title: 'Video 2' },
      { title: 'Video 3' },
    ],
  },
  {
    id: 't5',
    title: 'Fire Fighting Appliances (FFA)',
    videos: [
      { title: 'Familiarisation with Fire Control Plan' },
      { title: 'Familiarisation with Emergency Exit' },
      { title: 'Portable Fire Extinguisher' },
    ],
  },
  {
    id: 't6',
    title: 'Oil / Chemical / Gas Tanker',
    videos: [{ title: 'Intro and Layout' }, { title: 'Main Deck' }],
  },
  {
    id: 't7',
    title: 'Container Ship',
    videos: [{ title: 'Bay Plan, Row & Tier Understanding' }],
  },
  {
    id: 't8',
    title: 'Workshop Technology',
    videos: [
      { title: 'Different Types of Hammer and Its Types' },
      { title: 'Spanners Types and Its Application' },
    ],
  },
];

export default function DNSFreeTrialScreen() {
  const navigation = useNavigation();
  const [expandedIds, setExpandedIds] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null); // { topicId, topicTitle, title, index }

  // Tracks which video indices have been watched, per topic id
  // e.g. { t1: [0, 1, 2, 3] }
  const [watchedVideos, setWatchedVideos] = useState({});

  const toggleTopic = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectVideo = (topic, video, vIndex) => {
    setSelectedVideo({ topicId: topic.id, topicTitle: topic.title, ...video, index: vIndex });

    setWatchedVideos((prev) => {
      const current = prev[topic.id] || [];
      if (current.includes(vIndex)) return prev;
      return { ...prev, [topic.id]: [...current, vIndex] };
    });

    // navigation.navigate('VideoPlayer', { topicTitle: topic.title, ...video });
  };

  // Progress for the "Continue watching" card = how much of that
  // video's topic has been watched so far
  const continueWatchingProgress = useMemo(() => {
    if (!selectedVideo) return 0;
    const watchedCount = (watchedVideos[selectedVideo.topicId] || []).length;
    const topic = TOPICS.find((t) => t.id === selectedVideo.topicId);
    if (!topic) return 0;
    return watchedCount / topic.videos.length;
  }, [selectedVideo, watchedVideos]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={DARK_NAVY} />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>DNS Free Trial</Text>
          <Text style={styles.headerSubtitle}>Deck Preparation Videos</Text>
        </View>
        <View style={styles.backButtonSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue watching — only rendered once the user has actually
            watched something, so it never shows up empty */}
        {selectedVideo && (
          <View style={styles.continueCard}>
            <View style={styles.continueTopRow}>
              <View style={styles.continueIconCircle}>
                <Ionicons name="play-circle-outline" size={20} color={ARROW_COLOR} />
              </View>
              <View style={styles.continueTextWrap}>
                <Text style={styles.continueLabel}>Continue watching</Text>
                <Text style={styles.continueTitle} numberOfLines={1}>
                  {selectedVideo.title}
                </Text>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.max(6, continueWatchingProgress * 100)}%` },
                ]}
              />
            </View>
          </View>
        )}

        <Text style={styles.sectionLabel}>All Topics</Text>

        {/* Topic cards */}
        {TOPICS.map((topic) => {
          const isOpen = !!expandedIds[topic.id];
          const watchedCount = (watchedVideos[topic.id] || []).length;
          const totalCount = topic.videos.length;

          return (
            <View key={topic.id} style={styles.topicCard}>
              <TouchableOpacity
                style={styles.topicHeader}
                onPress={() => toggleTopic(topic.id)}
                activeOpacity={0.7}
              >
                <View style={styles.topicIconBox}>
                  <Ionicons name="play-circle-outline" size={22} color={ARROW_COLOR} />
                </View>

                <View style={styles.topicTextWrap}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicCount}>
                    {watchedCount > 0
                      ? `${watchedCount}/${totalCount}`
                      : `${totalCount} video${totalCount > 1 ? 's' : ''}`}
                  </Text>
                </View>

                <View style={styles.chevronBox}>
                  <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={ARROW_COLOR}
                  />
                </View>
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.videoList}>
                  {topic.videos.map((video, vIndex) => {
                    const isWatched = (watchedVideos[topic.id] || []).includes(vIndex);
                    return (
                      <TouchableOpacity
                        key={vIndex}
                        style={[
                          styles.videoRow,
                          vIndex === topic.videos.length - 1 && styles.videoRowLast,
                        ]}
                        onPress={() => handleSelectVideo(topic, video, vIndex)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.videoTextWrap}>
                          <Text style={styles.videoTitle}>{video.title}</Text>
                          <View style={styles.videoMetaRow}>
                            <Text style={styles.videoIndex}>Video {vIndex + 1}</Text>
                            {isWatched && (
                              <Ionicons
                                name="checkmark-circle"
                                size={13}
                                color={ARROW_COLOR}
                                style={styles.watchedIcon}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: '#1B2A4A',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: Platform.OS === 'android' ? 2 : 0,
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonSpacer: { width: 40 },
  headerTextWrap: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: DARK_NAVY },
  headerSubtitle: { fontSize: 13, color: SUBTEXT, marginTop: 2 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 32 },

  continueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 6,
    marginBottom: 18,
    ...shadow,
  },
  continueTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  continueTextWrap: { flex: 1 },
  continueLabel: { fontSize: 12.5, color: SUBTEXT, marginBottom: 2 },
  continueTitle: { fontSize: 15.5, color: DARK_NAVY, fontWeight: '700' },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: PROGRESS_TRACK,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: ACCENT,
  },

  sectionLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: DARK_NAVY,
    marginBottom: 10,
  },

  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: TOPIC_CARD_BORDER,
    marginBottom: 12,
    overflow: 'hidden',
    ...shadow,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  topicIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topicTextWrap: { flex: 1, marginRight: 8 },
  topicTitle: { fontSize: 15, fontWeight: '700', color: DARK_NAVY, lineHeight: 20 },
  topicCount: { fontSize: 12.5, color: SUBTEXT, marginTop: 3 },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VIDEO_ROW_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 12,
    marginBottom: 8,
  },
  videoRowLast: { marginBottom: 0 },
  videoTextWrap: { flex: 1, marginRight: 8 },
  videoTitle: { fontSize: 13.5, fontWeight: '600', color: DARK_NAVY, lineHeight: 18 },
  videoMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  videoIndex: { fontSize: 11.5, color: SUBTEXT },
  watchedIcon: { marginLeft: 6 },
});