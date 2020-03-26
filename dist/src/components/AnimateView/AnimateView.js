import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Animated, Easing } from 'react-native';
const RNWindow = Dimensions.get('window');

export default class ScaleAnimateView extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['scale', 'fade', 'slide-bottom', 'slide-top', 'slide-left', 'slide-right']),
    duration: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,

    style: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    type: 'fade',
    duration: 200,
    height: RNWindow.height * 0.5,
    width: RNWindow.width * 0.8,
  };

  constructor(props) {
    super(props);
    this.state = {
      scaleRatio: new Animated.Value(1.2),
      opacity: new Animated.Value(0),
      offsetH: new Animated.Value(props.type === 'slide-top' ? -this.props.height : this.props.height),
      offsetW: new Animated.Value(props.type === 'slide-left' ? -this.props.width : this.props.width),
    };
  }

  componentDidMount() {
    this.in();
  }

  in(callback) {
    const { type, duration } = this.props;
    let animateObj = {};
    switch(type) {
      case 'scale':
        animateObj = Animated.parallel([
          Animated.spring(this.state.scaleRatio, {
            toValue: 1,
            duration: duration,
          }),
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: duration,
          }),
        ]);
        break;
      case 'slide-bottom':
      case 'slide-top':
        animateObj = Animated.spring(this.state.offsetH, {
          toValue: 0,
          duration: duration,
          friction: 10,
          tension: 50,
        });
        break;
      case 'slide-left':
      case 'slide-right':
        animateObj = Animated.spring(this.state.offsetW, {
          toValue: 0,
          duration: duration,
          friction: 10,
          tension: 50,
        });
        break;
      default:
        animateObj = Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: duration,
        });
    }

    animateObj.start(() => {
      callback && callback();
    });
  }

  out(callback) {

    const { type, duration } = this.props;
    let animateObj = {};
    switch(type) {
      case 'scale':
        animateObj = Animated.parallel([
          Animated.timing(this.state.scaleRatio, {
            toValue: 1.1,
            duration: duration,
          }),
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: duration,
          }),
        ]);
        break;
      case 'slide-bottom':
        animateObj = Animated.timing(this.state.offsetH, {
          toValue: this.props.height * 1.3, // *1.3 是保证内容完全退出屏幕 
          duration: duration,
          easing: Easing.cubic,
        });
        break;
      case 'slide-top':
        animateObj = Animated.timing(this.state.offsetH, {
          toValue: -this.props.height * 1.3, // *1.3 是保证内容完全退出屏幕 
          duration: duration,
          easing: Easing.cubic,
        });
        break;
      case 'slide-left':
        animateObj = Animated.timing(this.state.offsetW, {
          toValue: -this.props.width * 1.2,
          duration: duration,
          easing: Easing.cubic,
        });
        break;
      case 'slide-right':
        animateObj = Animated.timing(this.state.offsetW, {
          toValue: this.props.width * 1.2,
          duration: duration,
          easing: Easing.cubic,
        });
        break;
      default:
        animateObj = Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: duration,
        });
    }

    animateObj.start(() => {
      callback && callback();
    });
  }

  buildAnimateViewStyle = () => {
    const { style, type } = this.props;
    let animateViewStyle = { ...style };
    switch(type) {
      case 'scale':
        animateViewStyle.opacity = this.state.opacity;
        animateViewStyle.transform = [{ scale: this.state.scaleRatio }];
        break;
      case 'slide-bottom':
      case 'slide-top':
        animateViewStyle.transform = [{ translateY: this.state.offsetH }];
        break;
      case 'slide-left':
      case 'slide-right':
        animateViewStyle.transform = [{ translateX: this.state.offsetW }];
        break;
      default:
        animateViewStyle.opacity = this.state.opacity;
    }
    return animateViewStyle;
  }

  render() {
    return (
      <Animated.View style={this.buildAnimateViewStyle()}>
        {this.props.children}
      </Animated.View>
    );
  }
}
