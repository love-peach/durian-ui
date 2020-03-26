
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import SplitLine from '../SplitLine/SplitLine';

import Theme from '../Theme/Theme';

export default class PopupHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    leftText: PropTypes.string,
    rightText: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,

    splitLineProps: PropTypes.object,

    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    leftText: '取消',
    rightText: '确认',
    splitLineProps: {},
  }


  render() {
    const { style, title, leftText, rightText, onLeftPress, onRightPress, splitLineProps } = this.props;
    return(
      <View>
        <View style={StyleSheet.flatten([styles.headerWrap, style])}>
          <Button size="lg" radius={0} type="text" color={Theme.title} onPress={() => { onLeftPress && onLeftPress(); }} containerStyle={{ paddingVertical: 15 }}>{leftText}</Button>
          <Text style={styles.title}>{title}</Text>
          <Button size="lg" radius={0}  type="text" color={Theme.warning} onPress={() => { onRightPress && onRightPress(); }} containerStyle={{ paddingVertical: 15 }}>{rightText}</Button>
        </View>
        <SplitLine { ...splitLineProps } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrap: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.grayLight,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: Theme.titleMain,
    textAlign: 'center',
  }
});