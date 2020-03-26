import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Tip } from '../component-path';

const tipIcon = require('../icons/phone_green.png');

export default class TipDemo extends Component {
  static navigationOptions = () => ({
    title: 'TipDemo',
  });

  render() {
    return (
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Tip style={styles.tipDemo} type="gray">type: gray</Tip>
          <Tip style={styles.tipDemo} type="primary">type: primary</Tip>
          <Tip style={styles.tipDemo} type="info">type: info</Tip>
          <Tip style={styles.tipDemo} type="warning">type: warning</Tip>
          <Tip style={styles.tipDemo} type="success">type: success</Tip>
          <Tip style={styles.tipDemo} type="golden">type: golden</Tip>

          <Tip style={styles.tipDemo} type="error" radius={0}>radius: 0</Tip>
          <Tip style={styles.tipDemo} type="error" radius={10}>radius: 10</Tip>
          <Tip style={styles.tipDemo} type="error" radius={100}>radius: 100</Tip>

          <Tip style={styles.tipDemo} type="error" color="#f0f">color: #f0f</Tip>
          <Tip style={styles.tipDemo} type="error" color="#0ff">color: #0ff</Tip>
          <Tip style={styles.tipDemo} type="error" color="#999">color: #999</Tip>

          <Tip style={styles.tipDemo} title="我是title">title 属性</Tip>
          <Tip style={styles.tipDemo} title="Iocn" icon={tipIcon}>欢迎拨打，188-xxxx-xxxx。Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, modi!</Tip>
          <Tip style={styles.tipDemo} icon={tipIcon} extra={<Button type="primary" size="xs">立即拨打</Button>}>客服热线：400-0000-0000</Tip>
          <Tip style={styles.tipDemo} icon={tipIcon} extra={tipIcon}>fefe</Tip>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tipDemo: {
    marginBottom: 10,
  },
});
