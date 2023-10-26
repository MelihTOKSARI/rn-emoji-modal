import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

import { Categories } from './constants/Categories';
import { Category } from './model/Category';

const categoryKeys = Object.keys(Categories);

interface CategoryProps {
  onPress: (category: Category) => void;
  width: number;
  activeCategory: Category;
  primaryColor: string;
  showAll: boolean;
  showHistory: boolean;
}

const CategoryBar = ({
  onPress,
  width,
  activeCategory,
  primaryColor,
  showAll,
  showHistory,
}: CategoryProps) => {
  const tabSize = width / categoryKeys.length;
  return categoryKeys.map((c: string) => {
    const category = Categories[c];
    if (!showAll && category!.name === 'All') {
      return undefined;
    }

    if (!showHistory && category!.name === 'Recently used') {
      return undefined;
    }

    return (
      <TouchableOpacity
        key={category!.name}
        onPress={() => onPress(category!)}
        style={[
          styles.categoryContainer,
          {
            height: tabSize,
            borderColor: category === activeCategory ? primaryColor : '#EEEEEE',
          },
        ]}
      >
        <Text style={[styles.category, { fontSize: tabSize - 24 }]}>
          {category!.symbol || category!.name}
        </Text>
      </TouchableOpacity>
    );
  });
};

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default CategoryBar;
