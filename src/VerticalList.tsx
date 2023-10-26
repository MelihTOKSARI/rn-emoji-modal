import React from 'react';
import {
  FlatList,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
} from 'react-native';

import EmojiCell from './EmojiCell';

interface EmojiListProps {
  categoryEmojis: Array<any>;
  cellWidth: number;
  colLength: number;
  rows?: number;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  onSelected: (emoji: string, item: any) => void;
}

const VerticalEmojiList = ({
  categoryEmojis,
  cellWidth,
  colLength,
  rows = 5,
  title,
  titleStyle,
  onSelected,
}: EmojiListProps) => {
  return (
    <View style={[styles.categoryWrapper]}>
      {title && <Text style={[styles.categoryTitle, titleStyle]}>{title}</Text>}
      <FlatList
        style={{ height: cellWidth * rows }}
        data={categoryEmojis}
        renderItem={(item) => (
          <EmojiCell
            emojiItem={item.item}
            colSize={cellWidth}
            onPress={onSelected}
          />
        )}
        numColumns={colLength}
        horizontal={false}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryWrapper: {
    flex: 1,
  },
  categoryTitle: {
    margin: 8,
    fontSize: 17,
    width: '100%',
    color: '#8F8F8F',
  },
});

export default VerticalEmojiList;
