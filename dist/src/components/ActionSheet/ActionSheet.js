import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import SplitLine from '../SplitLine/SplitLine';
import Theme from '../Theme/Theme';

import PropTypes from 'prop-types';

// TODO: 若 showCancel 为 true，则最好提供 onCancelPress 方法。
// TODO: 若 maskClosable 为 true，则最好提供 onMaskPress 方法。

export default class ActionSheet extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    theme: PropTypes.oneOf(['ios', 'android']),
    menus: PropTypes.array,
    onMenuPress: PropTypes.func,

    showCancel: PropTypes.bool,
    cancelText: PropTypes.string,
    onCancelPress: PropTypes.func,
    cancelProps: PropTypes.object,

    maskClosable: PropTypes.bool,
    onMaskPress: PropTypes.func,

    header: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.node, PropTypes.element]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }

  static defaultProps = {
    theme: 'ios',
    menus: [],

    showCancel: false,
    cancelText: '取消',
    cancelProps: {},

    maskClosable: true,
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

  // 生成header
  renderHeader() {
    const { header } = this.props;

    if (React.isValidElement(header)) {
      return header;
    }

    return (
      <View style={styles.headerWrap}>
        {typeof header === 'string' ? <Text style={styles.headerTitle} numberOfLines={1}>{header}</Text> : null}
        {header.title ? <Text style={styles.headerTitle} numberOfLines={1}>{header.title}</Text> : null}
        {header.titleSub ? <Text style={StyleSheet.flatten([styles.headerTitleSub, header.title ? { marginTop: 8 } : null])} numberOfLines={2}>{header.titleSub}</Text> : null}
      </View>
    );
  }

  render() {
    const { visible, theme, menus, header, showCancel, cancelText, onMenuPress,...restProps } = this.props;
    const menusLength = menus.length;
    return(
      <Modal visible={this.state.isVisible} {...restProps} placement={theme === 'ios' ? 'bottom' : 'center'} fade={theme === 'android'} contentStyle={{ padding: 0, backgroundColor: Theme.grayLight, overflow: 'hidden' }}>
        {header ? this.renderHeader() : null}
        {header ? <SplitLine color={Theme.grayDark} /> : null}
        
        {menus.map((item, index) => {
          return (
            <View key={`buttonWrap${index}`}>
              <Button
                radius={0}
                type={item && item.type ? item.type : 'white'}
                color={item && item.color ? item.color : undefined}
                backgroundColor={item && item.backgroundColor ? item.backgroundColor : undefined}
                ghost={item && item.disabled}
                outlineWidth={0}
                disabled={item && item.disabled}
                containerStyle={theme === 'ios' ? {} : {justifyContent: 'flex-start'}}
                onPress={() => {
                  item.onPress ? item.onPress(item) : this.props.onMenuPress && this.props.onMenuPress(item);
                }}
              >
                {item.label || item}
              </Button> 
              {index !== menusLength - 1 ? <SplitLine color={Theme.grayDark} /> : null}
            </View>
          );
        })}
        {showCancel ? (
          <View style={{ borderTopWidth: 6, borderTopColor: Theme.border }}>
            <Button
              type="white"
              radius={0}
              onPress={() => {
                this.props.onCancelPress && this.props.onCancelPress();
              }}
              {...this.props.cancelProps}
            >
              {cancelText}
            </Button>
          </View>
          
        ) : null}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: Theme.titleMain,
    fontWeight: 'bold',
  },
  headerTitleSub: {
    fontSize: 14,
    textAlign: 'center',
    color: Theme.titleSub,
  }
});