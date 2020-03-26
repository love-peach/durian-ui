import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../Theme/Theme';

/**
 * @type 按钮主题 [default, primary, info, warning, success, error, gray, golden, text]
 * @size 大小 [xl, lg, md, sm, xs]
 * 
 * @borderRadius 圆角大小
 * 
 * @color 文字颜色
 * @backgroundColor 背景色
 * 
 * @ghost 边框是否有
 * @outlineColor 边框颜色
 * @outlineWidth 边框粗细
 * @outlineType 边框类型 [solid, dotted, dashed]
 * 
 * @gradient 是否渐变
 * @gradientColors 渐变颜色
 * @gradientDirection 渐变方向
 * @gradientProps 渐变其他属性
 * 
 * @loading loading
 * @disabled 禁用
 * 
 * @icon 图标资源
 * @iconStyle 图标样式
 * @iconOnRight 图标是否在右边
 * @activityIndicatorColor loading 指示器颜色 默认为文字颜色
 * 
 * @containerStyle 容器样式 覆盖 padding 等
 * 
 * @onPress 事件
 * @clickInterval 防连点 默认 1000 毫秒
 */
export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden', 'text', 'white']),
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    radius: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    ghost: PropTypes.bool,
    outlineType: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
    outlineColor: PropTypes.string,
    outlineWidth: PropTypes.number,
    gradient: PropTypes.bool,
    gradientColors: PropTypes.array,
    gradientDirection: PropTypes.oneOf(['horizontal', 'vertical']),
    gradientProps: PropTypes.object,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    iconOnRight: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.node, PropTypes.element]),
    clickInterval: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  static defaultProps = {
    type: 'default',
    size: 'xl',
    radius: 1000,
    outlineType: 'solid',
    gradientColors: [Theme.info, Theme.primary],
    gradientDirection: 'horizontal',
    clickInterval: 1000,
  };

  prePressTime = 0;

  handleClick = event => {
    const { disabled, loading, clickInterval, onPress } = this.props;
    const now = Date.now();

    if (disabled || loading) return;

    if (clickInterval > 0 || this.prePressTime > 0) {
      if (now - this.prePressTime > clickInterval) {
        this.prePressTime = now;
        !!onPress && onPress(event);
      }
    } else {
      !!onPress && onPress(event);
    }
  };

  // 获取背景颜色
  getBackgroundColor() {
    const { ghost, disabled, backgroundColor, type } = this.props;
    if (ghost) {
      return 'transparent';
    }
    if (disabled) {
      if (type === 'text') {
        return Theme.btn_bg_text;
      }
      return Theme.btn_bg_disabled;
    }
    return backgroundColor || Theme[`btn_bg_${type}`];
  }

  // 获取文字颜色
  getLabelColor() {
    const { disabled, color, ghost, outlineColor, type, gradient } = this.props;
    if (disabled) {
      if (type === 'text' || ghost) {
        return Theme.grayDark;
      }
      return Theme.btn_text_disabled;
    }
    if (color) {
      return color;
    }
    if (ghost) {
      if (outlineColor) {
        return outlineColor;
      } else if (type === 'default') {
        return Theme.title;
      } else if (type === 'text') {
        return Theme[`btn_text_${type}`];
      } else {
        return Theme[`btn_bg_${type}`];
      }
    }
    if (gradient) {
      return Theme.white;
    }
    return Theme[`btn_text_${type}`];
  }

  // 获取边框样式
  getOutLineStyle() {
    const { type, ghost, outlineColor, outlineWidth, outlineType, disabled } = this.props;
    let outlineStyle = {
      borderColor: 'transparent',
      borderWidth: outlineWidth === 0 ? outlineWidth : outlineWidth || Theme.btn_border_width,
      borderStyle: outlineType,
    };
    if (ghost) {
      outlineStyle.borderWidth = outlineWidth === 0 ? outlineWidth : outlineWidth || Theme.btn_border_width;
      outlineStyle.borderStyle = outlineType;

      if (outlineColor) {
        outlineStyle.borderColor = outlineColor;
      } else if (type === 'default') {
        outlineStyle.borderColor = Theme.titleSub;
      } else if (type === 'text') {
        outlineStyle.borderColor = Theme[`btn_text_${type}`];
      } else {
        outlineStyle.borderColor = Theme[`btn_bg_${type}`];
      }
    }
    if (disabled) {
      outlineStyle.borderColor = Theme.grayDark;
    }
    return outlineStyle;
  }

  // 获取图标样式
  getIconStyle() {
    const { iconStyle = {}, iconOnRight } = this.props;
    const iconStyleFinaly = {
      tintColor: this.getLabelColor(),
      ...iconStyle,
    };
    if (iconOnRight) {
      iconStyleFinaly.marginLeft = 5;
    } else {
      iconStyleFinaly.marginRight = 5;
    }
    return [iconStyleFinaly];
  }

  // 构建组件样式
  buildStyle() {
    let { radius, style } = this.props;
    const outlineStyle = this.getOutLineStyle();
    return StyleSheet.flatten([
      {
        borderRadius: radius,
        backgroundColor: this.getBackgroundColor(),
        overflow: 'hidden',
        ...outlineStyle,
      },
      style
    ]);
  }

  // 获取渐变属性
  getGradientProps() {
    const { disabled, gradientColors, gradientDirection, gradientProps } = this.props;
    let gradientPropsFinaly = {
      colors: gradientColors,
      start: { x: 0, y: 0 },
    };

    if (disabled) {
      gradientPropsFinaly.colors = [Theme.gray, Theme.gray];
    }

    if (gradientDirection === 'horizontal') {
      gradientPropsFinaly.end = { x: 1, y: 0 };
    }

    if (gradientDirection === 'vertical') {
      gradientPropsFinaly.end = { x: 0, y: 1 };
    }

    gradientPropsFinaly = Object.assign({}, gradientPropsFinaly, { ...gradientProps });
    return gradientPropsFinaly;
  }

  // 生成按钮图标
  renderIcon() {
    const { icon, loading, activityIndicatorColor } = this.props;
    if (loading) {
      return <ActivityIndicator color={activityIndicatorColor || this.getLabelColor()} size="small" style={{ marginRight: 5, alignSelf: 'center', }} />;
    }

   
    if (icon) {
      if (React.isValidElement(icon)) {
        return icon;
      }
      // if (typeof icon === 'string') {
      //   return <Icon name={icon} style={this.getIconStyle()} />;
      // }
      return <Image source={icon} style={this.getIconStyle()} />;
    }
    return null;
  }

  // 生成按钮文字
  renderLabel() {
    const { size, children } = this.props;

    const labelStyleFinaly = StyleSheet.flatten([
      {
        color: this.getLabelColor(),
        fontSize: Theme[`btn_font_size_${size}`],
        fontWeight: Theme[`btn_font_weight_${size}`],
      },
    ]);

    if (children) {
      let childElements = [];
      React.Children.forEach(children, (item) => {
        const itemType = typeof item;
        if (itemType === 'string' || itemType === 'boolean' || itemType === 'number') {
          childElements.push(<Text key={item} style={labelStyleFinaly} numberOfLines={1}>{item + ''}</Text>);
        } else if (React.isValidElement(item)) {
          childElements.push(item);
        }
      });
      if(childElements.length && childElements.length > 1) {
        return <Text style={labelStyleFinaly} numberOfLines={1}>{childElements}</Text>;
      }
      // return <Text style={labelStyleFinaly} numberOfLines={1}>{childElements}</Text>;
      return childElements;
    }
    return null;
  }

  // 生成按钮内容
  renderContent() {
    const { size, iconOnRight, containerStyle } = this.props;
    const containerStyleFinal = StyleSheet.flatten([
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Theme[`btn_height_${size}`],
        minWidth: Theme[`btn_min_width_${size}`],
        paddingHorizontal: Theme[`btn_padding_horizontal_${size}`],
        // paddingVertical: Theme[`btn_padding_vertical_${size}`],
      },
      containerStyle,
    ]);
    return (
      <View style={containerStyleFinal}>
        {iconOnRight ? this.renderLabel() : this.renderIcon()}
        {iconOnRight ? this.renderIcon() : this.renderLabel()}
      </View>
    );
  }

  // 是否需要套一层渐变效果
  renderWrapAndContent() {
    const { gradient } = this.props;
    const gradientProps = this.getGradientProps();
    if (gradient) {
      return <LinearGradient {...gradientProps}>{this.renderContent()}</LinearGradient>;
    }
    return this.renderContent();
  }

  // 过滤不必要的 props
  buildProps = () => {
    let {
      containerStyle,
      type,
      color,
      backgroundColor,
      gradient,
      gradientColors,
      gradientDirection,
      gradientProps,
      icon,
      iconStyle,
      iconOnRight,
      size,
      ghost,
      outlineColor,
      outlineWidth,
      outlineType,
      radius,
      loading,
      activityIndicatorColor,
      clickInterval,
      onPress,
      style,
      children,
      ...restProps
    } = this.props;
    return { ...restProps };
  };

  render() {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={event => this.handleClick(event)} {...this.buildProps()}>
          <View style={this.buildStyle()}>
            {this.renderWrapAndContent()}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity style={this.buildStyle()} onPress={event => this.handleClick(event)} {...this.buildProps()}>
        {this.renderWrapAndContent()}
      </TouchableOpacity>
    );
  }
}
