import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import Theme from '../Theme/Theme';

/**
 * @paddingOffset 内部 cell 左右间距
 * @style 容器样式
 */
export default class InputItemGroup extends Component {

  static propTypes = {
    paddingOffset: PropTypes.number,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    paddingOffset: 12,
  }

  // 构建容器样式
  buildContainerStyle = () => {
    const { style } = this.props;
    let containerStyle = {
      // paddingLeft: 16,
      borderTopWidth: Theme.pixelSize,
      borderTopColor: Theme.border,
      borderBottomWidth: Theme.pixelSize,
      borderBottomColor: Theme.border,
    };
    return StyleSheet.flatten([containerStyle, style]);
  };

  // 渲染每个 cell
  renderChild = () => {
    const { paddingOffset, children } = this.props;
    if (children) {
      const childrenLength = React.Children.toArray(children).length;

      return React.Children.map(children, (item, index) => {
        const itemProps = {
          line: index === childrenLength - 1 ? false : true,
          style: {
            paddingLeft: paddingOffset,
          },
        };

        return React.cloneElement(item, { ...itemProps });
      });
    }
    return null;
  };

  render() {
    return (
      <View style={this.buildContainerStyle()}>
        {this.renderChild()}
      </View>
    );
  }
}