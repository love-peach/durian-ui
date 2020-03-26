// CarouselControl.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity, ViewPropTypes} from 'react-native';

export default class CarouselControl extends Component {

  static propTypes = {
    ...ViewPropTypes,
    dot: PropTypes.element,
    activeDot: PropTypes.element,
  };

  static defaultProps = {
    ...View.defaultProps,
  };

  renderDot(dotIndex) {
    let {dot, carousel} = this.props;
    if (React.isValidElement(dot)) {
      dot = React.cloneElement(dot, {key: dotIndex, onPress: () => carousel && carousel.scrollToPage(dotIndex)});
      return dot;
    }
    return (
      <TouchableOpacity
        key={'dot' + dotIndex}
        style={{
          width: 16,
          height: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => carousel && carousel.scrollToPage(dotIndex)}
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            width: 9,
            height: 9,
            borderRadius: 9 / 2,
          }}
        />
      </TouchableOpacity>
    );
  }

  renderActiveDot(dotIndex) {
    let { activeDot } = this.props;
    if (React.isValidElement(activeDot)) {
      activeDot = React.cloneElement(activeDot, {key: dotIndex});
      return activeDot;
    }
    return (
      <TouchableOpacity
        key={dotIndex}
        style={{
          width: 16,
          height: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            width: 9,
            height: 9,
            borderRadius: 9 / 2,
          }}
        />
      </TouchableOpacity>
    );
  }

  renderDots() {
    let {index, total} = this.props;
    let dots = [];
    for (let i = 0; i < total; ++i) {
      if (i == index) dots.push(this.renderActiveDot(i));
      else dots.push(this.renderDot(i));
    }
    return dots;
  }

  render() {
    let {style } = this.props;
    return (
      <View style={[styles.container, style]} pointerEvents='box-none'>
        <View style={{flexDirection: 'row'}}>
          {this.renderDots()}
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 4,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
