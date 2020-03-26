import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Button, Theme } from '../component-path';

import myTheme from './ThemeCustom';

export default class ThemeDemo extends Component {
  static navigationOptions = () => ({
    title: 'ThemeDemo',
  });

  handleSetThemeDefault = () => {
    Theme.set(Theme.themes.default);
    this.props.navigation.popToTop();
  }

  handleSetThemeBlack = () => {
    Theme.set(Theme.themes.black);
    this.props.navigation.popToTop();
  }

  handleSetThemeCustom = () => {
    Theme.set(myTheme);
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.tip}>这里只设置按钮的 primary 主题色</Text>
        <Button style={styles.btn} type="primary" onPress={this.handleSetThemeDefault}>预设主题：default</Button>
        <Button style={styles.btn} type="primary" onPress={this.handleSetThemeBlack}>预设主题：black</Button>
        <Button style={styles.btn} type="primary" onPress={this.handleSetThemeCustom}>自定义主题</Button>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  tip: {
    padding: 20,
    fontSize: 16,
  },
  btn: {
    margin: 10,
  }
});