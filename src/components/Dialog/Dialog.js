import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import Theme from '../Theme/Theme';

export default class Dialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    menus: PropTypes.array,
    title: PropTypes.string,
    msg: PropTypes.string,
    onMenuPress: PropTypes.func,

    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }

  static defaultProps = {
    menus: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.visible,
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
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const { visible, menus, title, msg, onMenuPress, children, ...restProps } = this.props;
    const menusLength = menus.length;
    return(
      <Modal maskClosable={false} placement='center' contentStyle={{ padding: 0, backgroundColor: Theme.grayLight}} {...restProps} visible={this.state.isVisible}>
        <View style={styles.contentWrap}>
          {title ? <Text style={styles.title}>{title}</Text> : null }
          {msg ? <Text style={styles.msg}>{msg}</Text> : null }
          {this.props.children}
        </View>

        <View style={styles.btnWrap}>
          {menus.map((item, index) => {
            return (
              <View key={index} style={StyleSheet.flatten([styles.btnItem, !item.type && index !== menusLength - 1 ? styles.btnItemBorderLeft : {}])}>
                <Button
                  radius={0}
                  type={item && item.type ? item.type : 'white'}
                  color={item && item.color ? item.color : undefined}
                  backgroundColor={item && item.backgroundColor ? item.backgroundColor : undefined}
                  ghost={item && item.disabled}
                  outlineWidth={0}
                  disabled={item && item.disabled}
                  onPress={() => {
                    item.onPress ? item.onPress(item) : this.props.onMenuPress && this.props.onMenuPress(item);
                  }}
                  style={{flex: 1}}
                >{item.label}</Button>
              </View>
            );
          })}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  contentWrap: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.titleMain,
    textAlign: 'center',
    marginBottom: 10,
  },
  msg: {
    fontSize: 16,
    color: Theme.title,
    lineHeight: 22,
  },
  btnWrap: {
    flexDirection: 'row',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },
  btnItem: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: Theme.pixelSize,
    borderTopColor: Theme.gray,
  },
  btnItemBorderLeft: {
    borderRightWidth: Theme.pixelSize,
    borderRightColor: Theme.gray,
  }
});