# rn-emoji-modal

Library to use emoji modal

## Installation

```sh
npm install rn-emoji-modal
```

You should also install below packages to run smoothly.

```sh
npm i @react-native-async-storage/async-storage
npm i react-native-svg
```

## Usage

```js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EmojiModal from 'rn-emoji-modal';

const PrimaryColor = '#007AFF';

// ...

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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
