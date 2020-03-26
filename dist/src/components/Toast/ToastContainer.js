import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import Mask from '../Mask/Mask';
import ContainerView from '../ContainerView/ContainerView';
import AnimateView from '../AnimateView/AnimateView';
import Theme from '../Theme/Theme';

const RNWindow = Dimensions.get('window');

export default class ToastContainer extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    delay: PropTypes.number,
    duration: PropTypes.number,
    
    placement: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    animateType: PropTypes.oneOf(['fade', 'scale', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right']),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    top: PropTypes.number,
    bottom: PropTypes.number,

    theme: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    radius: PropTypes.number,

    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
    iconStyle: PropTypes.object,

    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    maskBgColor: PropTypes.string,
    onMaskPress: PropTypes.func,

    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    visible: false,
    delay: 0,
    duration: 2000,
    placement: 'center',
    animateType: 'scale',
    theme: 'default',
    top: 80,
    bottom: 40,
    mask: false,
    maskClosable: true,
    maskBgColor: 'transparent',
    radius: 5,
  }

  constructor() {
    super(...arguments);
    this.state = {
      visible: this.props.visible,
    };
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        clearTimeout(this._showTimeout);
        clearTimeout(this._hideTimeout);
        this._showTimeout = setTimeout(() => this._show(), this.props.delay);
      } else {
        this._hide();
      }

      this.setState({
        visible: this.props.visible
      });
    }
  };

  componentWillUnmount = () => {
    console.log(2);
    // this._hide();
  };

  _animating = false;
  _hideTimeout = null;
  _showTimeout = null;

  _show = () => {
    clearTimeout(this._showTimeout);
    if (!this._animating) {
      clearTimeout(this._hideTimeout);
      this._animating = true;
      this.props.onShow && this.props.onShow();
      this.maskAnimateView && this.maskAnimateView.in();
      this.animateView && this.animateView.in(() => {
        this._animating = false;
        this.props.onShown && this.props.onShown();
        if (this.props.duration > 0) {
          this._hideTimeout = setTimeout(() => this._hide(), this.props.duration);
        }
      });
    }
  };

  _hide = () => {
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);

    if (!this._animating) {
      this.props.onHide && this.props.onHide();
      
      this.maskAnimateView && this.maskAnimateView.out();
      this.animateView && this.animateView.out(() => {
        this._animating = false;
        this.setState({
          visible: false,
        });
        this.props.onHidden && this.props.onHidden();
      });
    }
  };

  handleMaskClick = () => {
    this._hide();
  };

  // 内容 onLayout
  measureView(event) {
    this.setState({
      contentHeight: event.nativeEvent.layout.height,
    });
  }

  // 构建动画容器样式
  buildAnimateViewStyle() {
    const { width } = this.props;
    const widthNum = parseFloat(width);
    let dynamicStyle = {};
    if (widthNum) {
      if (widthNum > 100) {
        dynamicStyle.width = widthNum;
      } else {
        dynamicStyle.width = RNWindow.width * widthNum / 100;
      }
    }
    return dynamicStyle;
  }


  // 生成动画视图组件属性
  buildAnimateViewProps = () => {
    const { placement, width, animateType} = this.props;
    let WrapComponentProps = {};
    const isWidthNum = typeof width === 'number';

    switch(placement) {
      case 'center':
        break;
      case 'bottom':
        WrapComponentProps.height = this.state.contentHeight;
        break;
      case 'top':
        WrapComponentProps.height = this.state.contentHeight;
        break;
      case 'left':
        WrapComponentProps.width = width ? (isWidthNum ? width : RNWindow.width * width / 100) : RNWindow.width * 0.8;
        break;
      case 'right':
        WrapComponentProps.width = width ? (isWidthNum ? width : RNWindow.width * width / 100) : RNWindow.width * 0.8;
        break;
    }
    WrapComponentProps.type = animateType;
    console.log(WrapComponentProps, 'WrapComponentProps');
    return WrapComponentProps;
  }

  // 构建内容样式
  buildContentStyle() {
    const { theme, radius, backgroundColor } = this.props;
    let dynamicStyle = {};
    switch (theme) {
      case 'info':
        dynamicStyle.backgroundColor = Theme.info;
        break;
      case 'success':
        dynamicStyle.backgroundColor = Theme.success;
        break;
      case 'error':
        dynamicStyle.backgroundColor = Theme.error;
        break;
      default:
        dynamicStyle.backgroundColor = Theme.title;
    }
    if (backgroundColor) {
      dynamicStyle.backgroundColor = backgroundColor;
    }
    dynamicStyle.borderRadius = radius;

    return StyleSheet.flatten([styles.content, dynamicStyle]);
  }

  getLabelColor() {
    const { color } = this.props;
    return color || '#fff';
  }

  // 生成 图标
  renderIcon() {
    const { icon, iconStyle } = this.props;
    if (React.isValidElement(icon)) return icon;
    if (!icon || icon === 'none') return null;

    if (icon === 'loading') {
      return <ActivityIndicator color={this.getLabelColor()} size="large" style={{ marginTop: 8, marginBottom: 8, alignSelf: 'center', }} />;
    }

    let imageSource = icon;

    if (icon === 'success') {
      imageSource = require('../../icons/success.png');
    }
    if (icon === 'warning') {
      imageSource = require('../../icons/warning.png');
    }

    let imageStyle = {
      width: 40,
      height: 40,
      marginBottom: 8
    };
    return <Image style={StyleSheet.flatten([imageStyle, iconStyle])} source={imageSource} />;
  }

  // 生成文字
  renderLabel() {
    const { children } = this.props;
    const labelStyleFinaly = StyleSheet.flatten([styles.label, { color: this.getLabelColor()}]);

    if (children) {
      let childElements = [];
      React.Children.forEach(children, (item) => {
        if (typeof item === 'string') {
          childElements.push(<Text key={item} style={labelStyleFinaly}>{item}</Text>);
        } else if (typeof item === 'number') {
          childElements.push(<Text key={item} style={labelStyleFinaly}>{item + ''}</Text>);
        } else if (React.isValidElement(item)) {
          childElements.push(item);
        }
      });
      return childElements;
    }
    return null;
  }

  render() {
    const {  mask, maskClosable, onMaskPress, maskBgColor, placement } = this.props;

    return this.state.visible ? (
      <ContainerView style={styles.container} placement={placement}>
        {mask ? (
          <AnimateView type="fade" style={styles.maskWrap} ref={ref => { this.maskAnimateView = ref; }}>
            <Mask onPress={maskClosable ? (onMaskPress || this.handleMaskClick) : null} bgColor={maskBgColor} />
          </AnimateView>
        ) : null}
        <AnimateView ref={ele => this.animateView = ele} style={this.buildAnimateViewStyle()} {...this.buildAnimateViewProps() }>
          <View style={this.buildContentStyle()} onLayout={(event) => this.measureView(event)}>
            {this.renderIcon()}
            {this.renderLabel()}
          </View>
        </AnimateView>
      </ContainerView>
    ) : null;
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#4c4c4c',
    alignItems: 'center',
  },
  label: {
    // minWidth: 170,
    fontSize: 15,
    textAlign: 'center',
  },
  maskWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});