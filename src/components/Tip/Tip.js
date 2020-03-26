import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Text } from 'react-native';
import Theme from '../Theme/Theme';
import { getLightColor} from '../../utils/color';

/**
 * @type 按钮主题 [default, primary, info, warning, success, error, gray, golden, text]
 * @icon 图标
 * @iconStyle 图标样式
 * @style 容器样式
 */

export default class Tip extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden', 'text']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
    color: PropTypes.string,
    radius: PropTypes.number,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    extra: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    extraStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }

  static defaultProps = {
    type: 'primary',
    radius: 4,
    color: '',
  }

  buildContainerStyle() {
    const { type, radius, color, style } = this.props;
    
    let dynamicStyle = {
      borderRadius: radius,
      borderColor: color ? color : Theme[type],
      backgroundColor: getLightColor(color || Theme[type], .88),
    };


    return StyleSheet.flatten([styles.container, dynamicStyle, style]);
  }

  // 生成 图标
  renderIcon() {
    let { icon, iconStyle } = this.props;

    if (icon) {
      if(React.isValidElement(icon)) {
        return <View style={styles.iconWrap}>{icon}</View>;
      }
      return <Image style={StyleSheet.flatten([styles.iconWrap, styles.icon, iconStyle])} source={icon} />;
    }
    return null;
  }

  // 生成 标题
  renderTitle() {
    const { title } = this.props;
    if (title) {
      if (React.isValidElement(title)) return title;
      return <Text style={styles.title}>{ title }</Text>;
    }
    return null;
  }

  // 生成 tip 文字
  renderLabel() {
    const { children } = this.props;


    if (children) {
      let childElements = [];
      React.Children.forEach(children, (item) => {
        if (typeof item === 'string' || typeof item === 'number') {
          const element = <Text key={item} style={styles.label}>{item}</Text>;
          childElements.push(element);
        } else if (React.isValidElement(item)) {
          childElements.push(item);
        }
      });
      return childElements;
    }
    return null;
  }

  // 生成 extra
  renderExtra() {
    let { extra, extraStyle } = this.props;

    if (extra) {
      if(React.isValidElement(extra)) {
        return <View style={styles.extraWrap}>{extra}</View>;
      }
      if (typeof extra === 'string') {
        return <Text style={styles.extraWrap}>{extra}</Text>;
      }
      return <Image style={StyleSheet.flatten([styles.extraWrap, styles.extra, extraStyle])} source={extra} />;
    }
    return null;
  }

  render() {
    return (
      <View style={this.buildContainerStyle()}>
        {this.renderIcon()}
        <View style={styles.titleWrap}>
          {this.renderTitle()}
          {this.renderLabel()}
        </View>
        {this.renderExtra()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: Theme.pixelSize,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  iconWrap: {
    marginRight: 9,
  },
  icon: {
    width: 18,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: Theme.titleMain,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: getLightColor(Theme.title, 0.28),
    // lineHeight: 15,
    textAlign: 'justify'
  },
  extraWrap: {
    marginLeft: 9
  }
});
