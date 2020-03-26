import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class CarouselControlDemo extends Component {
  static propTypes = {
    index: PropTypes.number,
    total: PropTypes.number, 
    carousel: PropTypes.object,
  };

  renderDots() {
    let {index, total, carousel} = this.props;
    let dots = [];

    for (let i = 0; i < total; ++i) {
      const item = (
        <TouchableOpacity
          key={i}
          style={styles.dotWrap}
          onPress={() => {
            if (i === index ) {
              return;
            }
            console.log(i, 'ii');
            carousel && carousel.scrollToPage(i);
          }}
        >
          <View
            style={StyleSheet.flatten([styles.dot, index === i ? styles.dotActive : {}])}
          />
        </TouchableOpacity>
      );
      dots.push(item);
    }
    return dots;
  }

  render() {
    return (
      <View style={styles.controlWrap} pointerEvents='box-none'>
        {this.renderDots()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  controlWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotWrap: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: 'red',
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
  },
  dotActive: {
    backgroundColor: 'blue'
  }
});
