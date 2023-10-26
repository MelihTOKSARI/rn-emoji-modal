import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EmojiModal from 'rn-emoji-modal';

const PrimaryColor = '#007AFF';

export default function App() {
  const [emoji, setEmoji] = useState('');
  const onEmojiSelected = (selectedEmoji: string) => {
    console.log('App.tsx onEmojiSelected emoji:', selectedEmoji);
    setEmoji(selectedEmoji);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Please select the emoji you would like to use</Text>
      <View style={styles.display}>
        <Text style={styles.box}>{emoji}</Text>
      </View>
      <EmojiModal
        rows={5}
        onSelected={onEmojiSelected}
        showPreview={false}
        showHeader={false}
        showSearchBar={true}
        horizontal={true}
        showHistory={true}
        showAll={false}
        cellWidth={60}
        containerStyle={styles.containerStyle}
        containerPaddingHorizontal={16}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  display: {
    width: 120,
    height: 120,
    margin: 24,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: PrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    fontSize: 64,
    marginVertical: 20,
  },
  containerStyle: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    paddingTop: 32,
  },
});
