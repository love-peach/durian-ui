import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer from './ToastContainer';

export {
  RootSiblings as Manager
};
export default class Toast extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }

  static show = (message, options) => {
    return new RootSiblings(<ToastContainer
      { ...options }
      visible={true}
    >
      {message}
    </ToastContainer>);
  };

  static hide = toast => {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else {
      console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
    }
  };

  static success = (message, options) => {
    return new RootSiblings(<ToastContainer
      theme="success"
      icon="success"
      { ...options }
      visible={true}
    >
      {message}
    </ToastContainer>);
  };

  static error = (message, options) => {
    return new RootSiblings(<ToastContainer
      theme="error"
      icon="warning"
      { ...options }
      visible={true}
    >
      {message}
    </ToastContainer>);
  };

  static loading = (message, options) => {
    return new RootSiblings(<ToastContainer
      icon="loading"
      { ...options }
      visible={true}
    >
      {message}
    </ToastContainer>);
  };

  _toast = null

  UNSAFE_componentWillMount = () => {
    this._toast = new RootSiblings(<ToastContainer
      {...this.props}
      duration={0}
    />);
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    this._toast.update(<ToastContainer
      {...nextProps}
      duration={0}
    />);
  }

  componentWillUnmount = () => {
    console.log(1);
    this._toast.destroy();
  };

  render() {
    return null;
  }
}