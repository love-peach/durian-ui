import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Theme, Carousel } from '../component-path';

import CarouselControlDemo from './CarouselControlDemo';

export default class CarouselDemo extends Component {
  static navigationOptions = () => ({
    title: 'CarouselDemo',
  });

  constructor(props) {
    super(props);
    this.state = {
      horizontal: true,
      autoPlay: true,
      loop: false,
      interval: 3000,
      direction: 'forward',
      startIndex: 0,
      control: false,
    };
  }

  setValueByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  render() {
    return (
      <View style={styles.pageContent} >
        <View>
          <Carousel
            style={{ height: 100 }}
            horizontal={this.state.horizontal}
            autoPlay={this.state.autoPlay}
            loop={this.state.loop}
            interval={this.state.interval}
            direction={this.state.direction}
            startIndex={this.state.startIndex}
            control={this.state.control === 'custom' ? <CarouselControlDemo /> : this.state.control}
          >
            <View style={{ backgroundColor: Theme.primary, height: '100%' }}><Text>1</Text></View>
            <View style={{ backgroundColor: Theme.info, height: '100%' }}><Text>2</Text></View>
            <View style={{ backgroundColor: Theme.success, height: '100%' }}><Text>3</Text></View>
            <View style={{ backgroundColor: Theme.warning, height: '100%' }}><Text>4</Text></View>
            <View style={{ backgroundColor: Theme.error, height: '100%' }}><Text>5</Text></View>
          </Carousel>
        </View>

        <ScrollView>
        
          <Text style={styles.title}>horizontal</Text>
          <ButtonRadio value={this.state.horizontal} options={[true, false]} onPress={v => {this.setValueByKey('horizontal', v);}} />

          <Text style={styles.title}>autoPlay</Text>
          <ButtonRadio value={this.state.autoPlay} options={[true, false]} onPress={v => {this.setValueByKey('autoPlay', v);}} />

          <Text style={styles.title}>loop</Text>
          <ButtonRadio value={this.state.loop} options={[true, false]} onPress={v => {this.setValueByKey('loop', v);}} />

          <Text style={styles.title}>interval</Text>
          <ButtonRadio value={this.state.interval} options={[0, 1000, 2000, 3000]} onPress={v => {this.setValueByKey('interval', v);}} />

          <Text style={styles.title}>direction</Text>
          <ButtonRadio value={this.state.direction} options={['forward', 'backward']} onPress={v => {this.setValueByKey('direction', v);}} />

          <Text style={styles.title}>startIndex</Text>
          <ButtonRadio value={this.state.startIndex} options={[0,1,2,3,4]} onPress={v => {this.setValueByKey('startIndex', v);}} />

          <Text style={styles.title}>control</Text>
          <ButtonRadio value={this.state.control} options={[true, false,  'custom']} onPress={v => {this.setValueByKey('control', v);}} />

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
