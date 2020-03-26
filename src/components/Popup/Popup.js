import React, { Component } from 'react';
import Modal from '../Modal/Modal';

import PropTypes from 'prop-types';

export default class Popup extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    maskClosable: PropTypes.bool,
    onMaskPress: PropTypes.func,
    contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),

    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    header: false,
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

  render() {
    const { contentStyle = {}, children, ...restProps } = this.props;
    return(
      <Modal visible={this.state.isVisible} placement="bottom" {...restProps} contentStyle={{ padding: 0, ...contentStyle }}>
        {this.props.children}
      </Modal>
    );
  }
}