import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { CellGroup, Cell } from '../component-path';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  goto(route) {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <ScrollView>
        <CellGroup borderOffset={0}>
          <Cell title="ThemeDemo" link onPress={this.goto.bind(this, 'ThemeDemo')} />
          <Cell title="ButtonDemo" link onPress={this.goto.bind(this, 'ButtonDemo')} />
          <Cell title="ButtonGroupDemo" link onPress={this.goto.bind(this, 'ButtonGroupDemo')} />
          <Cell title="ButtonRadioDemo" link onPress={this.goto.bind(this, 'ButtonRadioDemo')} />
          <Cell title="CellDemo" link onPress={this.goto.bind(this, 'CellDemo')} />
          <Cell title="InputDemo" link onPress={this.goto.bind(this, 'InputDemo')} />
          <Cell title="TipDemo" link onPress={this.goto.bind(this, 'TipDemo')} />
          <Cell title="CarouselDemo" link onPress={this.goto.bind(this, 'CarouselDemo')} />
        </CellGroup>

        <CellGroup style={{ marginVertical: 20 }}>
          <Cell title="ModalDemo" link onPress={this.goto.bind(this, 'ModalDemo')} />
          <Cell title="PopupDemo" link onPress={this.goto.bind(this, 'PopupDemo')} />
          <Cell title="ActionSheetDemo" link onPress={this.goto.bind(this, 'ActionSheetDemo')} />
          <Cell title="DialogDemo" link onPress={this.goto.bind(this, 'DialogDemo')} />
          <Cell title="ToastDemo" link onPress={this.goto.bind(this, 'ToastDemo')} />
        </CellGroup>
      </ScrollView>
    );
  }
}
