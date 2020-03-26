import React, { Component }from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ViewPropTypes } from 'react-native';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Button from '../Button/Button';


export default class ButtonRadio extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    options: PropTypes.array,
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']),
    activeType: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']),
    ghost: PropTypes.bool,
    activeGhost: PropTypes.bool,
    braceUp: PropTypes.bool,
    radius: PropTypes.number,
    clickInterval: PropTypes.number,
    style: ViewPropTypes.style,
    onPress: PropTypes.func,
  }
  static defaultProps = {
    type: 'default',
    activeType: 'primary',
    ghost: true,
    activeGhost: false,
    radius: 0,
    clickInterval: 0,
  }

  handleOnPress = (data) => {
    let passData = data;
    if (typeof data.value !== 'undefined') {
      passData = data.value;
    }

    if (data.onPress) {
      data.onPress(passData);
    } else {
      this.props.onPress && this.props.onPress(passData);
    }
  }

  renderLabel(item) {
    if (typeof item.label === 'undefined') {
      return item + '';
    } else {
      return item.label + '';
    }
  }

  render() {
    const { value, options, type, activeType, ghost, activeGhost, braceUp, clickInterval, onPress, ...restProps } = this.props;
    return (
      <ButtonGroup {...restProps}>
        {
          options.map((item, index) => {
            const isActive = value !== undefined && value === item.value || value === item;
            let isGhost = ghost;
            if (isActive) {
              isGhost = activeGhost;
            }
            let dynamicStyle = {};
            if (braceUp) {
              dynamicStyle.flex = 1;
            }
            
            return (
              <Button
                clickInterval={clickInterval}
                type={isActive ? activeType : type}
                ghost={isGhost}
                key={index}
                onPress={() => {this.handleOnPress(item);}}
                style={StyleSheet.flatten([dynamicStyle, item.style])}
              >
                {this.renderLabel(item)}
              </Button>
            );
          })
        }
      </ButtonGroup>
    );
  }
}