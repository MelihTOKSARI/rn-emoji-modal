import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from 'react-native';

import SearchSVG from './UI/Search';

interface SearchbarProps {
  placeholder: string;
  searchQuery: string;
  searchWrapperStyle?: StyleProp<ViewStyle>;
  searchStyle?: StyleProp<TextStyle>;
  primaryColor: string;
  onSearchQueryChanged: (text: string) => void;
}
const Searchbar = ({
  placeholder,
  searchQuery,
  searchWrapperStyle,
  searchStyle,
  primaryColor,
  onSearchQueryChanged,
}: SearchbarProps) => {
  return (
    <View style={[styles.searchbarContainer, searchWrapperStyle]}>
      <SearchSVG />
      <TextInput
        style={[styles.search, searchStyle]}
        placeholder={placeholder}
        clearButtonMode="always"
        returnKeyType="done"
        autoCorrect={false}
        underlineColorAndroid={primaryColor}
        value={searchQuery}
        onChangeText={onSearchQueryChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EFF1F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  search: {
    marginHorizontal: 8,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    textAlignVertical: 'center',
    flexGrow: 1,
  },
});

export default Searchbar;
