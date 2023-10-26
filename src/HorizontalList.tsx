import React from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';

import EmojiCell from './EmojiCell';

interface HorizontalContainerProps {
  categoryEmojis: Array<any>;
  cellWidth: number;
  rows?: number;
  onSelected: (emoji: string, item: any) => void;
}

const HorizontalContainer = ({
  categoryEmojis,
  cellWidth,
  onSelected,
}: HorizontalContainerProps) => {
  return (
    <FlatList
      data={categoryEmojis}
      renderItem={(item) => (
        <EmojiCell
          emojiItem={item.item}
          colSize={cellWidth}
          onPress={onSelected}
        />
      )}
      numColumns={1}
      horizontal={false}
      keyboardShouldPersistTaps={'always'}
      removeClippedSubviews
      scrollEnabled={false}
      alwaysBounceVertical={false}
    />
  );
};

interface EmojiListProps {
  categoryEmojis: Array<any>;
  cellWidth: number;
  colLength: number;
  rows?: number;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  onSelected: (emoji: string, item: any) => void;
}

const HorizontalEmojiList = ({
  categoryEmojis,
  cellWidth,
  colLength,
  rows = 5,
  title,
  titleStyle,
  onSelected,
}: EmojiListProps) => {
  return (
    <View style={[styles.categoryWrapper, styles.horizontalCategoryWrapper]}>
      {title && <Text style={[styles.categoryTitle, titleStyle]}>{title}</Text>}
      <FlatList
        style={{ minHeight: cellWidth * rows, maxHeight: cellWidth * rows }}
        data={categoryEmojis}
        renderItem={(item) => (
          <HorizontalContainer
            categoryEmojis={item.item}
            cellWidth={cellWidth}
            onSelected={onSelected}
          />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        key={colLength}
        removeClippedSubviews
        keyboardShouldPersistTaps={'always'}
        horizontal
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
  horizontalCategoryWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

export default HorizontalEmojiList;
