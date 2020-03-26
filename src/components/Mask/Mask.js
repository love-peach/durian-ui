import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Theme from '../Theme/Theme';

/**
 * @bgColor 遮罩层背景色
 * @onMaskPress 点击遮罩层事件
 */

export default class Mask extends Component {
  static propTypes = {
    bgColor: PropTypes.string,
    onMaskPress: PropTypes.func,
  }

  render() {
    const { bgColor, ...restProps } = this.props;
    
    return (
      <TouchableWithoutFeedback {...restProps}>
        <View style={StyleSheet.flatten([styles.mask, { backgroundColor: bgColor || Theme.mask_bg}])}></View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    // zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
