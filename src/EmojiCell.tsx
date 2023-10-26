import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const charFromUtf16 = (utf16: any) =>
  String.fromCodePoint(...utf16.split('-').map((u: any) => '0x' + u));
export const charFromEmojiObject = (obj: any) => charFromUtf16(obj.unified);

interface EmojiCellProps {
  emojiItem: any;
  colSize: number;
  onPress: (emoji: string, emojiItem: any) => void;
}

const EmojiCell = ({
  emojiItem,
  colSize,
  onPress,
  ...other
}: EmojiCellProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.cellWrapper, { width: colSize, height: colSize }]}
      {...other}
      onPress={() => onPress(charFromEmojiObject(emojiItem.emoji), emojiItem)}
      key={emojiItem.key}
    >
      <Text style={[styles.cell, { fontSize: colSize - 12 }]}>
        {charFromEmojiObject(emojiItem.emoji)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cellWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    color: '#FFFFFF',
  },
});

export default EmojiCell;
