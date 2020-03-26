import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Modal, View, TouchableOpacity, Image, Platform, NativeModules, Dimensions } from 'react-native';
import ContainerView from '../ContainerView/ContainerView';
import AnimateView from '../AnimateView/AnimateView';
import Mask from '../Mask/Mask';


const RNWindow = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const closeIconDefaultSource = require('../../icons/close.png');

/**
 * @param {Boolean} visible 控制 modal 是否显示
 * @param {String} placement 弹框内容出现位置，可选值为 [center, bottom, top, left, right]
 * @param {Number|String} width 内容块宽度 可以设置数值 或者 字符串。当其值不大于 100 时以百分比显示，大于 100 时为具体值
 * @param {Object} contentStyle 内容块样式
 * 
 * @param {Boolean} closable 是否显示关闭按钮
 * @param {Object} closeStyle 关闭按钮样式
 * @param {Function} onClosePress 关闭按钮点击事件
 * 
 * @param {Function} maskBgColor 遮罩层的背景色
 * @param {Function} maskClosable 是否允许点击遮罩层关闭弹框
 * @param {Function} onMaskPress 遮罩层点击事件
 * 
 */

// TODO: 如果没有提供 onMaskPress 或者 onClosePress 函数，并且 设置 closable = true maskClosable = true，则关闭后，父组件 state 改变后，会自动弹出弹框。所以最好提供手动关闭的函数。
export default class MyModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    placement: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    animateType: PropTypes.oneOf(['fade', 'scale', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right']),
    animateDuration: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    radius: PropTypes.number,
    contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),

    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    maskBgColor: PropTypes.string,
    onMaskPress: PropTypes.func,

    closable: PropTypes.bool,
    closeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    onClosePress: PropTypes.func,

    onRequestClose: PropTypes.func,

    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    placement: 'center',
    animateDuration: 200,
    radius: 5,
    closable: false,
    mask: true,
    maskClosable: false,
    maskBgColor: 'rgba(0, 0, 0, .5)',
    onRequestClose: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount() {
    this.setState({
      isVisible: this.props.visible,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible === this.props.visible && nextProps.visible === this.state.isVisible) {
      return;
    }
    if (nextProps.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.setState({
      isVisible: true,
    });
  }

  hide() {
    const { animateDuration } = this.props;
    this.animateView && this.animateView.out();
    this.maskAnimateView && this.maskAnimateView.out();
    setTimeout(() => {
      this.setState({
        isVisible: false,
      });
    }, animateDuration);
  }

  handleMaskClick = () => {
    this.hide();
  };

  handleCloseClick = () => {
    this.hide();
  };

  // 构建内容容器样式
  buildContentStyle() {
    const { placement, radius, width, contentStyle } = this.props;
    const radiusNum = parseFloat(radius, 10);
    const widthNum = parseFloat(width, 10);
    let additionStyle = {};
    switch (placement) {
      case 'center':
        additionStyle = {
          width: widthNum ? (widthNum > 100 ? widthNum : RNWindow.width * widthNum / 100 ) : RNWindow.width * 0.8,
          borderRadius: radiusNum,
          padding: 10,
        };
        break;
      case 'top':
        additionStyle = {
          width: widthNum ? (widthNum > 100 ? widthNum : RNWindow.width * widthNum / 100 ) : RNWindow.width,
          borderBottomLeftRadius: radiusNum,
          borderBottomRightRadius: radiusNum,
          padding: 10,
          paddingTop: STATUSBAR_HEIGHT,
        };
        break;
      case 'bottom':
        additionStyle = {
          width: widthNum ? (widthNum > 100 ? widthNum : RNWindow.width * widthNum / 100 ) : RNWindow.width,
          padding: 10,
          borderTopLeftRadius: radiusNum,
          borderTopRightRadius: radiusNum,
        };
        break;
      case 'left':
      case 'right':
        additionStyle = {
          width: widthNum ? (widthNum > 100 ? widthNum : RNWindow.width * widthNum / 100 ) : RNWindow.width * 0.8,
          height: '100%',
          paddingTop: STATUSBAR_HEIGHT,
        };
        break;
      default:
        additionStyle = {
          width: widthNum ? (widthNum > 100 ? widthNum : RNWindow.width * widthNum / 100 ) : RNWindow.width,
        };
    }
    return StyleSheet.flatten([styles.content, additionStyle, contentStyle]);
  }

  // 生成动画视图组件
  buildAnimateViewProps = () => {
    const { placement, animateType, width } = this.props;
    let WrapComponentProps = {};
    const widthNum = parseFloat(width, 10);


    switch(placement) {
      case 'center':
        WrapComponentProps.type = animateType || 'scale';
        break;
      case 'bottom':
        WrapComponentProps.type = animateType || 'slide-bottom';
        WrapComponentProps.height = this.state.contentHeight;
        break;
      case 'top':
        WrapComponentProps.type = animateType || 'slide-top';
        WrapComponentProps.height = this.state.contentHeight;
        break;
      case 'left':
        WrapComponentProps.type = animateType || 'slide-left';
        WrapComponentProps.widthNum ? (widthNum > 100 ? widthNum : RNWindow.width * widthNum / 100 ) : RNWindow.width * 0.8;
        break;
      case 'right':
        WrapComponentProps.type = animateType || 'slide-right';
        WrapComponentProps.widthNum ? (widthNum > 100 ? widthNum : RNWindow.width * widthNum / 100 ) : RNWindow.width * 0.8;
        break;
      default:
        WrapComponentProps.type = animateType || 'scale';
    }
    return WrapComponentProps;
  }
  
  // 内容 onLayout
  measureView(event) {
    const { placement } = this.props;
    if (placement === 'top' || placement === 'bottom') {
      this.setState({
        contentHeight: event.nativeEvent.layout.height,
      });
    }
  }

  // 生成关闭按钮
  renderCloseIcon() {
    let { closable, onClosePress, placement, closeStyle } = this.props;
    if (closable) {
      return (
        <TouchableOpacity onPress={onClosePress || this.handleCloseClick} style={[styles.closeIcon, { top: placement === 'bottom' || placement === 'center' ? 0 : 8 + STATUSBAR_HEIGHT }, { ...closeStyle }]}>
          <Image style={{ width: 15, height: 15 }} source={closeIconDefaultSource} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { visible, placement, animateType, animateDuration, width, radius, contentStyle, mask, maskBgColor, maskClosable, onMaskPress, closable, onClosePress, closeStyle, ...resProps } = this.props;
    const { isVisible } = this.state;

    return (
      <Modal visible={isVisible} {...resProps } transparent hardwareAccelerated animationType="none">
        {mask ? (
          <AnimateView
            style={styles.maskWrap}
            ref={ref => {
              this.maskAnimateView = ref;
            }}
            duration={animateDuration || undefined}
          >
            <Mask onPress={maskClosable ? (onMaskPress || this.handleMaskClick) : null} bgColor={maskBgColor} />
          </AnimateView>
        ) : null}

        <ContainerView placement={placement}>
          <AnimateView
            ref={ref => {
              this.animateView = ref;
            }}
            duration={animateDuration || undefined}
            {...this.buildAnimateViewProps()}
          >
            <View style={this.buildContentStyle()}  onLayout={(event) => this.measureView(event)}>
              {this.renderCloseIcon()}
              {this.props.children}
            </View>
          </AnimateView>
        </ContainerView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99,
    padding: 8,
  },
  maskWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
