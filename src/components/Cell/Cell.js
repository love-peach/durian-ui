import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import SplitLine from '../SplitLine/SplitLine';
import Theme from '../Theme/Theme';

/**
 * @title 标题 左上
 * @label 说明 左下
 * @value 值 右上
 * @extra 附加 右下
 * @valuePlace 空值 placeholder
 * @titleStyle 标题 左上 样式
 * @labelStyle 说明 左下 样式
 * @valueStyle 值 右上 样式
 * @extraStyle 附加 右下 样式
 * @valuePlaceStyle 空值 placeholder 样式
 * @icon 图标
 * @iconStyle 图标样式
 * @link 带箭头
 * @indicator 指示器
 * @indicatorDirection 指示器方向
 * @indicatorStyle 指示器样式
 * @line 分割线
 * @lineStyle 分割线样式
 * @containerWrapStyle 容器外层样式 包含内容 和 分割线
 * @containerStyle 容器样式 包含 icon 文字 和 指示器
 * @activeOpacity 同 TouchableHighlight 属性
 * @underlayColor 同 TouchableHighlight 属性
 * @clickInterval 点击间隔
 * @onPress
 */

export default class Cell extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    extra: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    valuePlace: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    valueStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    valuePlaceStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    extraStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    link: PropTypes.bool,
    indicator: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    indicatorDirection: PropTypes.string,
    indicatorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    line: PropTypes.bool,
    lineStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    containerWrapStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    activeOpacity: PropTypes.number,
    underlayColor: PropTypes.string,
    onPress: PropTypes.func,
    clickInterval: PropTypes.number,
  };

  static defaultProps = {
    indicator: 'arrow',
    line: true,
    activeOpacity: 0.5,
    underlayColor: Theme.border,
    clickInterval: 0,
    onPress: null,
  };

  prePressTime = 0;

  // 点击事件
  handleClick = event => {
    const { clickInterval, onPress } = this.props;
    const now = Date.now();

    if (clickInterval > 0 || this.prePressTime > 0) {
      if (now - this.prePressTime > clickInterval) {
        this.prePressTime = now;
        !!onPress && onPress(event);
      }
    } else {
      !!onPress && onPress(event);
    }
  };

  // 生成标题 左上角
  renderTitle() {
    const { title, titleStyle } = this.props;
    if (React.isValidElement(title)) return title;
    return (
      <Text numberOfLines={1} style={StyleSheet.flatten([styles.title, titleStyle])}>
        {title}
      </Text>
    );
  }

  // 生成值 左下角
  renderValue() {
    const { value, valueStyle, valuePlace, valuePlaceStyle } = this.props;
    if (value) {
      if (React.isValidElement(value)) return value;
      return <Text style={StyleSheet.flatten([styles.value, valueStyle])}>{value}</Text>;
    } else if (valuePlace) {
      if (React.isValidElement(valuePlace)) return valuePlace;
      return <Text style={StyleSheet.flatten([styles.valuePlace, valuePlaceStyle])}>{valuePlace}</Text>;
    }
  }

  // 生成说明 右上角
  renderLabel() {
    const { label, labelStyle } = this.props;
    if (React.isValidElement(label)) return label;
    return <Text style={StyleSheet.flatten([styles.label, labelStyle])}>{label}</Text>;
  }
  
  // 生成补充 右下角
  renderExtra() {
    const { extra, extraStyle } = this.props;
    if (React.isValidElement(extra)) return extra;
    return <Text style={StyleSheet.flatten([styles.extra, extraStyle])}>{extra}</Text>;
  }

  // 组合 标题和值 上层
  renderContentRowTop() {
    const { title, value } = this.props;
    if (title || value) {
      return (
        <View style={styles.contentRow}>
          {this.renderTitle()}
          {this.renderValue()}
        </View>
      );
    }
    return null;
  }

  // 组合 说明和补充 下层
  renderContentRowBottom() {
    const { label, extra } = this.props;
    if (label || extra) {
      return (
        <View style={StyleSheet.flatten([styles.contentRow, styles.contentRowBottom])}>
          {this.renderLabel()}
          {this.renderExtra()}
        </View>
      );
    }
    return null;
  }

  // 生成 图标
  renderIcon() {
    let { icon, iconStyle } = this.props;

    if (icon) {
      if(React.isValidElement(icon)) {
        return <View style={{ marginRight: 9 }}>{icon}</View>;
      }
      return <Image style={StyleSheet.flatten([styles.icon, iconStyle])} source={icon} />;
    }
    return null;
  }

  // 生成 指示器
  renderIndicator() {
    const { link, indicator, indicatorDirection, indicatorStyle, onPress } = this.props;
    if (React.isValidElement(indicator)) return indicator;
    if (!link || indicator === 'none' || !onPress) return null;

    let imageSource;

    if (indicator === 'arrow') {
      imageSource = require('../../icons/arrow.png');

    }
    if (indicator === 'plus') {
      imageSource = require('../../icons/plus.png');
    }

    let imageStyle = {
      width: 5,
      height: 10,
      marginLeft: 8,
    };
    if (indicatorDirection === 'up') {
      imageStyle.transform = [
        {
          rotate: '90deg',
        },
      ];
    }
    if (indicatorDirection === 'down') {
      imageStyle.transform = [
        {
          rotate: '-90deg',
        },
      ];
    }
    return <Image style={StyleSheet.flatten([imageStyle, indicatorStyle])} source={imageSource} />;
  }

  // 生成 分割线
  renderSplitLine() {
    const { line, lineStyle } = this.props;
    if (line) {
      return <SplitLine style={lineStyle} />;
    }
    return null;
  }
  
  // 过滤不必要的 props
  buildProps = () => {
    const  { activeOpacity, underlayColor, onPress, ...restProps } = this.props;
    const propsFinal = {
      ...restProps, activeOpacity: onPress ? activeOpacity : 1, underlayColor: onPress ? underlayColor : 'transparent'
    };
    return propsFinal;
  };

  render() {
    const { containerWrapStyle, containerStyle } = this.props;
    return (
      <TouchableHighlight {...this.buildProps()} onPress={event => this.handleClick(event)} >
        {/* 容器外层样式，包含 内容 和 分割线 */}
        <View style={StyleSheet.flatten([containerWrapStyle])}>
          {/* 容器样式，包含 图标 文字 指示器 */}
          <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            {this.renderIcon()}
            <View style={styles.content}>
              {this.renderContentRowTop()}
              {this.renderContentRowBottom()}
            </View>
            {this.renderIndicator()}
          </View>
          {this.renderSplitLine()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentRowBottom: {
    marginTop: 4,
  },
  title: {
    fontSize: Theme.cell_font_size_title,
    color: Theme.cell_color_title,
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    fontSize: Theme.cell_font_size_value,
    color: Theme.cell_color_value,
  },
  valuePlace: {
    fontSize: Theme.cell_font_size_value_place,
    color: Theme.cell_color_value_place,
  },
  label: {
    fontSize: Theme.cell_font_size_label,
    color: Theme.cell_color_label,
    flex: 1,
    textAlign: 'justify'
  },
  extra: {
    fontSize: Theme.cell_font_size_extra,
    color: Theme.cell_color_extra,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 9,
  },
};

