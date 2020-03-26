import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import Theme from '../Theme/Theme';

/**
 * @size 设置按钮组大小 [xl, lg, md, sm, xs] md
 * @radius 设置按钮组圆角大小 1000
 * @ghost 设置幽灵按钮组 false
 * @vertical 设置按钮组垂直布局 false
 */

export default class ButtonGroup extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    radius: PropTypes.number,
    ghost: PropTypes.bool,
    vertical: PropTypes.bool,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    size: 'md',
    radius: 1000,
  }

  // 构建容器样式 水平 和 垂直
  buildContainerStyle = () => {
    const { size, vertical, style } = this.props;
    let containerStyle = {};
    if (vertical) {
      containerStyle = {
        flexDirection: 'column',
        justifyContent: 'center',
        width: Theme[`btn_group_width_${size}`] + 2,
      };
    } else {
      containerStyle = {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      };
    }
    return StyleSheet.flatten([containerStyle, style]);
  };

  // 构建单个按钮样式 水平布局
  buildItemStyle = (index, length, itemProps) => {
    const { radius } = this.props;
    const { ghost } = itemProps;
    let itemStyle = {};
    if (index === 0) {
      if (index === length - 1) {
        itemStyle = {
          borderRadius: radius,
        };
      } else {
        itemStyle = {
          borderTopLeftRadius: radius,
          borderBottomLeftRadius: radius,
          // borderRightColor: ghost ? undefined : '#fff',
          zIndex: length - index
        };
        if (!ghost) {
          itemStyle.borderRightColor = '#fff';
        }
      }
    } else if (index === length - 1) {
      itemStyle = {
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        zIndex: length - index,
        marginLeft: -Theme.pixelSize,
      };
    } else {
      itemStyle = {
        borderRadius: 0,
        // borderRightColor: ghost ? undefined : '#fff',
        marginLeft: -Theme.pixelSize,
        zIndex: length - index
      };
      if (!ghost) {
        itemStyle.borderRightColor = '#fff';
      }
    }
    return itemStyle;
  };

  // 构建单个按钮样式 垂直布局
  buildItemStyleVertical = (index, length, itemProps) => {
    const { ghost } = itemProps;
    const { radius } = this.props;

    let itemStyle = {};
    if (index === 0 && index !== length - 1) {
      if (index === length - 1) {
        itemStyle = {
          borderRadius: radius,
        };
      } else {
        itemStyle = {
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          borderBottomColor: ghost ? undefined : '#fff',
          zIndex: length - index
        };
      }
    } else if (index === length - 1 && index !== 0){
      itemStyle = {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        zIndex: length - index,
        marginTop: -Theme.pixelSize,
      };
    } else {
      itemStyle = {
        borderRadius: 0,
        borderBottomColor: ghost ? undefined : '#fff',
        zIndex: length - index,
        marginTop: -Theme.pixelSize,
      };
    }
    return itemStyle;
  }

  // 渲染每个按钮 并添加 props
  renderChild = () => {
    const { size, ghost, vertical, children } = this.props;
    if (children) {
      const childrenLength = React.Children.toArray(children).length;
      return React.Children.map(children, (item, index) => {
        const itemProps = {
          size,
          ghost: item.props.ghost === false ? false : item.props.ghost || ghost,
          radius: 0
        };
        const currentStyle = vertical ? this.buildItemStyleVertical(index, childrenLength, itemProps) : this.buildItemStyle(index, childrenLength, itemProps);

        return React.cloneElement(item, { ...itemProps, style: { ...currentStyle, ...item.props.style }});
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
