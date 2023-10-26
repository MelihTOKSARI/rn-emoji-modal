import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import CloseSVG from './Close';
import SaveSVG from './Save';

interface Props {
  headerStyle?: StyleProp<ViewStyle>;
  primaryColor: string;
  primaryContainerStyle?: StyleProp<ViewStyle>;
  secondaryColor: string;
  secondaryContainerStyle?: StyleProp<ViewStyle>;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  onClosed: (event: GestureResponderEvent) => void;
  onSave: (event: GestureResponderEvent) => void;
}

const Header = ({
  headerStyle,
  primaryColor,
  primaryContainerStyle,
  secondaryColor,
  secondaryContainerStyle,
  title,
  titleStyle,
  onClosed,
  onSave,
}: Props) => {
  return (
    <View style={[styles.container, headerStyle]}>
      <TouchableOpacity
        onPress={onClosed}
        style={[
          styles.iconContainer,
          { backgroundColor: secondaryColor },
          secondaryContainerStyle,
        ]}
      >
        <CloseSVG />
      </TouchableOpacity>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <TouchableOpacity
        onPress={onSave}
        style={[
          styles.iconContainer,
          { backgroundColor: primaryColor },
          primaryContainerStyle,
        ]}
      >
        <SaveSVG />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D4DCEC',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 32,
  },
  title: {
    color: '#131720',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 24,
  },
});

export default Header;
