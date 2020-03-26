import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,  StyleSheet } from 'react-native';

export default class ContainerView extends Component {
  static propTypes = {
    placement: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    style: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    placement: 'center',
  }

  buildContainerStyle() {}

  render() {
    const { style, placement } = this.props; 
    return (
      <View style={StyleSheet.flatten([styles.container, styles[placement], {...style }])} pointerEvents="box-none">
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
});
