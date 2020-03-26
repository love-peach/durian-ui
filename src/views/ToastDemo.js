import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Button, ButtonGroup, Toast, Theme } from '../component-path';

// import Theme from '../themes/Theme';

export default class ToastDemo extends Component {
  static navigationOptions = () => ({
    title: 'ToastDemo',
  });

  state = {
    isShowToast: false,
    theme: 'default',
    placement: 'center',
    animateType: 'scale', 
    backgroundColor: '',
    color: '#fff',
    icon: false,
    mask: false,
    maskBgColor: 'transparent',
    maskClosable: true,
    width: '',
    radius: 5,
  };

  setModalVisibleByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  handleShowToast() {
    this.MyToast && this.MyToast.destroy();
    this.MyToast = Toast.show('There are some msg', {
      theme: this.state.theme,
      placement: this.state.placement,
      animateType: this.state.animateType,
      backgroundColor: this.state.backgroundColor || undefined,
      color: this.state.color,
      icon: this.state.icon,
      mask: this.state.mask,
      maskBgColor: this.state.maskBgColor,
      maskClosable: this.state.maskClosable,
      width: this.state.width || undefined,
      radius: parseInt(this.state.radius, 10),
      onHidden: () => {
        this.handleCloseToast();
      }
    });
  }

  handleCloseToast() {
    this.MyToast && Toast.hide(this.MyToast);
  }

  handleShowToastBySuccess() {
    this.MyToast && this.MyToast.destroy();
    this.MyToast = Toast.success('Success!', {
      // theme: this.state.theme,
      placement: this.state.placement,
      animateType: this.state.animateType,
      // backgroundColor: this.state.backgroundColor || undefined,
      // color: this.state.color,
      mask: this.state.mask,
      maskBgColor: this.state.maskBgColor,
      maskClosable: this.state.maskClosable,
      width: this.state.width || undefined,
      radius: parseInt(this.state.radius, 10)
    });
  }

  handleShowToastByError() {
    this.MyToast && this.MyToast.destroy();
    this.MyToast = Toast.error('fail!', {
      // theme: this.state.theme,
      placement: this.state.placement,
      animateType: this.state.animateType,
      // backgroundColor: this.state.backgroundColor || undefined,
      // color: this.state.color,
      mask: this.state.mask,
      maskBgColor: this.state.maskBgColor,
      maskClosable: this.state.maskClosable,
      width: this.state.width || undefined,
      radius: parseInt(this.state.radius, 10)
    });
  }

  handleShowToastByLoading() {
    this.MyToast5 && this.MyToast5.destroy();
    this.MyToast5 = Toast.loading('loading', {
      theme: this.state.theme,
      placement: this.state.placement,
      animateType: this.state.animateType,
      backgroundColor: this.state.backgroundColor || undefined,
      color: this.state.color,
      mask: this.state.mask,
      maskBgColor: this.state.maskBgColor,
      maskClosable: this.state.maskClosable,
      width: this.state.width || undefined,
      radius: parseInt(this.state.radius, 10)
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          
          <Text style={styles.title}>placement</Text>
          <ButtonRadio value={this.state.placement} options={['center', 'top', 'bottom', 'left', 'right']} onPress={v => {this.setModalVisibleByKey('placement', v);}} />

          <Text style={styles.title}>animateType</Text>
          <ButtonRadio value={this.state.animateType} options={['scale', 'fade', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right']} onPress={v => {this.setModalVisibleByKey('animateType', v);}} />

          <Text style={styles.title}>theme</Text>
          <ButtonRadio value={this.state.theme} options={['default', 'info', 'success', 'error']} onPress={v => {this.setModalVisibleByKey('theme', v);}} />

          <Text style={styles.title}>width</Text>
          <ButtonRadio value={this.state.width} options={[ {label: 'unset', value: ''}, 30, 50, 80, 101, 150, 200, 300]} onPress={v => {this.setModalVisibleByKey('width', v);}} />

          <Text style={styles.title}>radius</Text>
          <ButtonRadio value={this.state.radius} options={[0, 2, 5, 10, 1000]} onPress={(v) => {this.setModalVisibleByKey('radius', v);}} />

          <Text style={styles.title}>backgroundColor</Text>
          <ButtonRadio value={this.state.backgroundColor} options={[{label: 'unset', value: ''}, Theme.title, 'red', 'pink', 'rgba(0,0,0,.5)']} onPress={v => {this.setModalVisibleByKey('backgroundColor', v);}} />

          <Text style={styles.title}>color</Text>
          <ButtonRadio value={this.state.color} options={['#fff', 'red', 'blue', 'yellow']} onPress={v => {this.setModalVisibleByKey('color', v);}} />

          <Text style={styles.title}>icon</Text>
          <ButtonRadio value={this.state.icon} options={[false, 'none', 'success', 'warning', 'loading']} onPress={v => {this.setModalVisibleByKey('icon', v);}} />

          <Text style={styles.title}>mask</Text>
          <ButtonRadio value={this.state.mask} options={[false, true]} onPress={v => {this.setModalVisibleByKey('mask', v);}} />

          <Text style={styles.title}>maskBgColor</Text>
          <ButtonRadio value={this.state.maskBgColor} options={['transparent', 'red', '#90ea3d', 'rgba(0,0,0,.6)', 'rgba(101,0,212,.5)']} onPress={(v) => {this.setModalVisibleByKey('maskBgColor', v); }} size="sm" />

          <Text style={styles.title}>maskClosable</Text>
          <ButtonRadio value={this.state.maskClosable} options={[false, true]} onPress={(v) => {this.setModalVisibleByKey('maskClosable', v); }} />

        </ScrollView>

        <View>
          <ButtonGroup size="md" style={styles.btnWrap}>
            <Button backgroundColor={Theme.title} style={styles.btnDemo} onPress={() => {this.handleShowToast();}}>show</Button>
            <Button type="success" style={styles.btnDemo} onPress={() => {this.handleShowToastBySuccess();}}>success</Button>
            <Button type="error" style={styles.btnDemo} onPress={() => {this.handleShowToastByError();}}>error</Button>
            <Button backgroundColor={Theme.title} style={styles.btnDemo} onPress={() => {this.handleShowToastByLoading();}}>loading</Button>
          </ButtonGroup>
          <ButtonGroup size="xl" style={styles.btnWrap}>
            <Button type="primary" style={styles.btnDemo} onPress={() => {this.handleShowToast();}}>show</Button>
            <Button type="error" style={styles.btnDemo} onPress={() => {this.handleCloseToast();}}>close</Button>
          </ButtonGroup>
          <ButtonGroup size="xl" style={styles.btnWrap}>
            <Button type="primary" style={styles.btnDemo} onPress={() => {this.setModalVisibleByKey('isShowToast', true);}}>show component</Button>
            <Button type="error" style={styles.btnDemo} onPress={() => {this.setModalVisibleByKey('isShowToast', false);}}>close component</Button>
          </ButtonGroup>
        </View>

        <Toast
          visible={this.state.isShowToast}
          theme={this.state.theme}
          placement={this.state.placement}
          animateType={this.state.animateType}
          backgroundColor={this.state.backgroundColor || undefined}
          color={this.state.color}
          icon={this.state.icon}
          mask={this.state.mask}
          maskBgColor={this.state.maskBgColor}
          maskClosable={this.state.maskClosable}
          width={this.state.width || undefined}
          radius={parseInt(this.state.radius, 10)}
          onHidden={() => {
            this.setModalVisibleByKey('isShowToast', false);
          }}
        >
            component
        </Toast>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  btnWrap: {
    margin: 10,
  },
  btnDemo: {
    flex: 1,
  }
});