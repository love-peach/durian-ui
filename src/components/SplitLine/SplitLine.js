import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Theme from '../Theme/Theme';

export default class SplitLine extends Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
    color: PropTypes.string,
    size: PropTypes.number,
    opacity: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    width: '100%',
    type: 'solid',
    color: Theme.border,
    size: Theme.pixelSize,
    opacity: 0.9,
    style: {},
  };

  buildStyle() {
    const { width, color, type, size, opacity, style } = this.props;

    return StyleSheet.flatten([{
      width,
      marginRight: 'auto',
      marginLeft: 'auto',
      borderTopWidth: size,
      borderColor: color,
      borderStyle: type,
      opacity: opacity,
    }, style]);
  }

  render() {
    return <View style={this.buildStyle()} />;
  }
}
