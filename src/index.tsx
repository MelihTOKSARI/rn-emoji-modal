import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import emoji from 'emoji-datasource';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './UI/Header';
import Searchbar from './SearchBar';
import { type Category } from './model/Category';
import { Categories } from './constants/Categories';
import CategoryBar from './CategoryBar';
import HorizontalEmojiList from './HorizontalList';
import VerticalEmojiList from './VerticalList';

const storage_key = '@rn-emoji-modal:HISTORY';

const filteredEmojis = emoji.filter((e) => !e.obsoleted_by);
const emojiByCategory = (category: string) =>
  filteredEmojis.filter((e) => e.category === category);
const sortEmoji = (list: any) =>
  list.sort((a: any, b: any) => a.emoji.sort_order - b.emoji.sort_order);
const categoryKeys = Object.keys(Categories);

interface Props {
  cellWidth?: number;
  columns?: number;
  containerStyle?: StyleProp<ViewStyle>;
  containerPaddingHorizontal?: number;
  previewWrapperStyle?: StyleProp<ViewStyle>;
  previewStyle?: StyleProp<TextStyle>;
  searchWrapperStyle?: StyleProp<ViewStyle>;
  searchStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  emptyWrapperStyle?: StyleProp<ViewStyle>;
  emptyTextStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  primaryColor?: string;
  secondaryColor?: string;
  emptyText?: string;
  horizontal?: boolean;
  numColumns?: number;
  rows?: number;
  showCategories?: boolean;
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  showHeader?: boolean;
  headerTitle?: string;
  showAll?: boolean;
  showHistory?: boolean;
  showPreview?: boolean;
  showTabs?: boolean;
  onSelected: (selected: string) => void;
}

const EmojiModal = ({
  cellWidth = 50,
  containerStyle,
  containerPaddingHorizontal = 0,
  previewWrapperStyle,
  previewStyle,
  searchWrapperStyle,
  searchStyle,
  titleStyle,
  emptyWrapperStyle,
  emptyTextStyle,
  headerStyle,
  headerTitleStyle,
  primaryColor = '#007AFF',
  secondaryColor = '#E9EDF5',
  emptyText = 'No emoji found with searched text!',
  horizontal = true,
  numColumns = 6,
  rows = 5,
  showCategories = true,
  showSearchBar = true,
  searchPlaceholder = 'Search Emoji',
  showHeader = false,
  headerTitle = 'Select Emoji',
  showAll = false,
  showHistory = false,
  showPreview = true,
  showTabs = true,
  onSelected,
}: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [colLength, setColLength] = useState(0);
  const [colSize, setColSize] = useState(0);
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState<string>('');
  const [category, setCategory] = useState<Category>(
    Categories.emotion as Category
  );
  const [emojiListEmpty, setEmojiListEmpty] = useState(false);
  const [categoryEmojis, setCategoryEmojis] = useState({});

  useEffect(() => {
    prerenderCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!categoryEmojis || !width) {
      return;
    }

    if (horizontal) {
      setColLength(
        Math.ceil((categoryEmojis[category.name] as Array<any>).length / rows)
      );
    } else {
      setColSize(
        Math.floor((width - containerPaddingHorizontal * 2) / numColumns)
      );
    }
    setIsReady(true);
  }, [
    category,
    categoryEmojis,
    containerPaddingHorizontal,
    horizontal,
    numColumns,
    rows,
    width,
  ]);

  useEffect(() => {
    setIsReady(true);
  }, [searchQuery]);

  const prerenderCategories = async () => {
    const emojiList = {};
    categoryKeys.forEach((c) => {
      let name = Categories[c]!.name;

      const _categoryEmojis = sortEmoji(
        emojiByCategory(name).map((_emoji) => ({
          key: _emoji.unified,
          emoji: _emoji,
        }))
      );
      emojiList[name] = {
        list: _categoryEmojis,
        length: _categoryEmojis.length,
      };
    });
    if (showAll) {
      const _allEmojis = filteredEmojis.map((_emoji) => ({
        key: _emoji.unified,
        emoji: _emoji,
      }));
      emojiList[Categories.all!.name] = {
        list: _allEmojis,
        length: _allEmojis.length,
      };
    }

    if (showHistory) {
      let _history = await loadHistoryAsync();
      _history = _history.map((_emoji) => ({
        key: _emoji.unified,
        emoji: _emoji,
      }));
      emojiList[Categories.history!.name] = {
        list: _history,
        length: _history.length,
      };
    }

    setCategoryEmojis(emojiList);
  };

  const handleOnLayout = ({ nativeEvent: { layout } }) => {
    setWidth(layout.width);
  };

  const onSearchChanged = (text: string) => {
    setIsReady(false);
    setEmojiListEmpty(false);
    setSearchQuery(text);
  };

  const onCategoryPressed = (selectedCategory: Category) => {
    setIsReady(false);
    setCategory(selectedCategory);
    setSelected('');
    setSearchQuery('');
  };

  const onEmojiSelected = (selectedEmoji: string, item: any) => {
    if (showHistory) {
      addToHistoryAsync(item);
    }
    setSelected(selectedEmoji);
    onSelected(selectedEmoji);
  };

  const renderSectionData = () => {
    let list = [];
    if (searchQuery) {
      list = emoji.filter((t) =>
        t.short_names.some((name) => name.includes(searchQuery.toLowerCase()))
      );
      list = sortEmoji(
        list.map((_emoji) => ({ key: _emoji.unified, emoji: _emoji }))
      );
    } else if (category.name === Categories.history!.name) {
      list = sortEmoji(
        history.map((_emoji) => ({ key: _emoji.unified, emoji: _emoji }))
      );
    } else {
      list = categoryEmojis![category.name].list;
    }

    if (horizontal) {
      const horizontalList = [];

      list.forEach((_, index: number) => {
        if (index % rows === 0) {
          const subList = list.slice(index, index + rows);
          horizontalList.push(subList);
        }
      });

      list = horizontalList;
    }

    if (!emojiListEmpty && list?.length === 0) {
      setEmojiListEmpty(true);
    } else if (emojiListEmpty && list?.length > 0) {
      setEmojiListEmpty(false);
    }

    return list;
  };

  const onCompleted = () => {
    console.log('onCompleted');
  };

  const onClose = () => {
    console.log('onClose');
  };

  const addToHistoryAsync = async (item) => {
    let _history = await AsyncStorage.getItem(storage_key);

    let value = [];
    if (!_history) {
      let record = Object.assign({}, item.emoji);
      value.push(record);
    } else {
      let json = JSON.parse(_history);
      if (json.filter((r) => r.unified === item.emoji.unified).length > 0) {
        value = json;
      } else {
        let record = Object.assign({}, item.emoji);
        value = [record, ...json];
      }
    }

    AsyncStorage.setItem(storage_key, JSON.stringify(value));
    setHistory(value);
  };

  const loadHistoryAsync = async () => {
    let result = await AsyncStorage.getItem(storage_key);

    if (result) {
      setHistory(JSON.parse(result) || []);
    }
    return result ? JSON.parse(result) : [];
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { paddingHorizontal: containerPaddingHorizontal },
      ]}
      onLayout={handleOnLayout}
    >
      {showHeader && (
        <Header
          headerStyle={headerStyle}
          titleStyle={headerTitleStyle}
          title={headerTitle}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onSave={onCompleted}
          onClosed={onClose}
        />
      )}
      {showPreview && selected && (
        <View style={[styles.previewWrapper, previewWrapperStyle]}>
          <Text style={[styles.previewEmoji, previewStyle]}>{selected}</Text>
        </View>
      )}
      {showSearchBar && (
        <Searchbar
          searchQuery={searchQuery}
          onSearchQueryChanged={onSearchChanged}
          placeholder={searchPlaceholder || ''}
          searchWrapperStyle={searchWrapperStyle}
          searchStyle={searchStyle}
          primaryColor={primaryColor}
        />
      )}
      {isReady && !emojiListEmpty && colLength > 0 && horizontal && (
        <HorizontalEmojiList
          title={category.name}
          colLength={colLength}
          cellWidth={cellWidth}
          rows={rows}
          categoryEmojis={renderSectionData()}
          onSelected={onEmojiSelected}
          titleStyle={titleStyle}
        />
      )}
      {isReady && !emojiListEmpty && colSize > 0 && !horizontal && (
        <VerticalEmojiList
          title={category.name}
          colLength={numColumns}
          cellWidth={colSize}
          rows={rows}
          categoryEmojis={renderSectionData()}
          onSelected={onEmojiSelected}
          titleStyle={titleStyle}
        />
      )}
      {emojiListEmpty && (
        <View
          style={[
            styles.emptyWrapper,
            { minHeight: cellWidth * rows },
            emptyWrapperStyle,
          ]}
        >
          <Text style={emptyTextStyle}>{emptyText}</Text>
        </View>
      )}
      {!isReady && (
        <View style={[styles.loader, { minHeight: cellWidth * rows }]}>
          <ActivityIndicator
            size={'large'}
            color={Platform.OS === 'android' ? primaryColor : '#000000'}
          />
        </View>
      )}
      {showTabs && (
        <View style={styles.categoryBar}>
          {showCategories && (
            <CategoryBar
              activeCategory={category}
              onPress={onCategoryPressed}
              width={width}
              primaryColor={primaryColor}
              showAll={showAll}
              showHistory={showHistory}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    backgroundColor: '#ccc',
  },
  previewWrapper: {
    width: 96,
    height: 96,
    margin: 24,
    borderWidth: 2,
    borderColor: '#D4DCEC',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#FFD080',
  },
  previewEmoji: {
    fontSize: 64,
    backgroundColor: 'transparent',
  },
  categoryBar: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmojiModal;
