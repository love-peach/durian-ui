import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch } from 'react-native';
import { Button, ButtonRadio, Theme } from '../component-path';

const buttonIcon = require('../icons/close.png');

export default class ButtonDemo extends Component {
  static navigationOptions = () => ({
    title: 'ButtonDemo',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      type: 'default',
      size: 'xl',
      radius: 1000,
      icon: false,
      iconOnRight: false,
      ghost: false,
      gradient: false,
      gradientColors0: Theme.info,
      gradientColors1: Theme.primary,
      outlineType: 'dashed',
      outlineColor: Theme.title,
      outlineWidth: Theme.pixelSize,
      gradientDirection: 'horizontal',
      color: '',
      backgroundColor: '',
      disabled: false,
      clickInterval: 1000,
    };
  }

  pressEvent() {
    console.log('click1');
  }

  longPressEvent() {
    console.log('long');
  }

  setValueByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };


  render() {
    return (
      <View style={styles.pageContent}>
        <View>
          <Button
            type={this.state.type}
            size={this.state.size}
            radius={this.state.radius}
            icon={this.state.icon ? buttonIcon : false}
            iconOnRight={this.state.iconOnRight}
            loading={this.state.loading}
            ghost={this.state.ghost}
            outlineType={this.state.outlineType}
            outlineColor={this.state.outlineColor}
            outlineWidth={this.state.outlineWidth}
            disabled={this.state.disabled}
            gradient={this.state.gradient}
            gradientColors={[this.state.gradientColors0, this.state.gradientColors1]}
            gradientDirection={this.state.gradientDirection}
            color={this.state.color || undefined}
            backgroundColor={this.state.backgroundColor || undefined}
          >
              demo
          </Button>
          <View style={styles.btnWrap}>
            <Button
              type={this.state.type}
              size={this.state.size}
              radius={this.state.radius}
              icon={this.state.icon ? buttonIcon : false}
              iconOnRight={this.state.iconOnRight}
              loading={this.state.loading}
              ghost={this.state.ghost}
              outlineType={this.state.outlineType}
              outlineColor={this.state.outlineColor}
              outlineWidth={this.state.outlineWidth}
              disabled={this.state.disabled}
              gradient={this.state.gradient}
              gradientColors={[this.state.gradientColors0, this.state.gradientColors1]}
              gradientDirection={this.state.gradientDirection}
              color={this.state.color || undefined}
              backgroundColor={this.state.backgroundColor || undefined}
            >
              A
            </Button>
          </View>
        </View>

        <ScrollView style={{flex: 1}}>

          <Text style={styles.title}>type</Text>
          <ScrollView horizontal>
            <ButtonRadio value={this.state.type} options={['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden', 'text' ]} onPress={v => {this.setValueByKey('type', v);}} />
          </ScrollView>

          <Text style={styles.title}>size</Text>
          <ButtonRadio value={this.state.size} options={['xs', 'sm', 'md', 'lg', 'xl' ]} onPress={v => {this.setValueByKey('size', v);}} />

          <Text style={styles.title}>radius</Text>
          <ButtonRadio value={this.state.radius} options={[0, 2, 5, 10, 1000]} onPress={v => {this.setValueByKey('radius', v);}} />

          <Text style={styles.title}>icon</Text>
          <Switch value={this.state.icon} onValueChange={(v) => {
            this.setValueByKey('icon', v);
          }} />
          
         
          <ButtonRadio value={this.state.icon} options={[true, false]} onPress={v => {this.setValueByKey('icon', v);}} />

          <Text style={styles.title}>loading</Text>
          <ButtonRadio value={this.state.loading} options={[true, false]} onPress={v => {this.setValueByKey('loading', v);}} />

          <Text style={styles.title}>iconOnRight</Text>
          <ButtonRadio value={this.state.iconOnRight} options={[true, false]} onPress={v => {this.setValueByKey('iconOnRight', v);}} />

          <Text style={styles.title}>ghost</Text>
          <ButtonRadio value={this.state.ghost} options={[true, false]} onPress={v => {this.setValueByKey('ghost', v);}} />

          <Text style={styles.title}>outlineType</Text>
          <ButtonRadio value={this.state.outlineType} options={['solid', 'dotted', 'dashed']} onPress={v => {this.setValueByKey('outlineType', v);}} />

          <Text style={styles.title}>outlineColor</Text>
          <ButtonRadio value={this.state.outlineColor} options={[Theme.title, Theme.titleSub, 'red']} onPress={v => {this.setValueByKey('outlineColor', v);}} />

          <Text style={styles.title}>outlineWidth</Text>
          <ButtonRadio value={this.state.outlineWidth} options={[Theme.pixelSize, 1, 2, 3, 4, 5]} onPress={v => {this.setValueByKey('outlineWidth', v);}} />

          <Text style={styles.title}>gradient</Text>
          <ButtonRadio value={this.state.gradient} options={[true, false]} onPress={v => {this.setValueByKey('gradient', v);}} />

          <Text style={styles.title}>gradientColors[0]</Text>
          <ButtonRadio value={this.state.gradientColors0} options={[Theme.info, Theme.primary, Theme.success,  Theme.warning, Theme.error]} onPress={v => {this.setValueByKey('gradientColors0', v);}} />

          <Text style={styles.title}>gradientColors[1]</Text>
          <ButtonRadio value={this.state.gradientColors1} options={[Theme.info, Theme.primary, Theme.success,  Theme.warning, Theme.error]} onPress={v => {this.setValueByKey('gradientColors1', v);}} />

          <Text style={styles.title}>gradientDirection</Text>
          <ButtonRadio value={this.state.gradientDirection} options={['horizontal', 'vertical']} onPress={v => {this.setValueByKey('gradientDirection', v);}} />

          <Text style={styles.title}>color</Text>
          <ButtonRadio value={this.state.color} options={[{label: 'unset', value: ''}, 'red', 'blue', 'pink', '#f26291']} onPress={v => {this.setValueByKey('color', v);}} />

          <Text style={styles.title}>backgroundColor</Text>
          <ButtonRadio value={this.state.backgroundColor} options={[{label: 'unset', value: ''}, '#2faa93', 'rgba(0,0,0,.4)']} onPress={v => {this.setValueByKey('backgroundColor', v);}} />

          <Text style={styles.title}>disabled</Text>
          <ButtonRadio value={this.state.disabled} options={[true, false]} onPress={v => {this.setValueByKey('disabled', v);}} />

        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  pageContent: {
    position: 'relative',
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  btnWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  btnDemo: {
    marginBottom: 10,
    marginHorizontal: 5,
  }
});
