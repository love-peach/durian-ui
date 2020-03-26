import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Button, Modal } from '../component-path';


export default class ModalDemo extends Component {
  static navigationOptions = () => ({
    title: 'ModalDemo',
  });

  state = {
    placement: 'center',
    animateType: '',
    animateDuration: '',
    width: '',
    radius: '',
    closable: false,
    isShowModal: false,
    mask: true,
    maskClosable: false,
    maskBgColor: 'rgba(0,0,0,.6)',
  };

  setModalVisibleByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  renderDemoText() {
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 15 }}>Lorem ipsum dolor sit</Text>
        <Text style={{ marginBottom: 10, marginRight: 15, marginLeft: 15, textAlign: 'justify' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam quia dolore deleniti vel fuga omnis repellat ut! Voluptates expedita ipsum ex commodi tenetur debitis animi asperiores. Eius alias corrupti deleniti?</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>placement</Text>
          <ButtonRadio value={this.state.placement} options={['center', 'bottom', 'top', 'left', 'right']} onPress={v => {this.setModalVisibleByKey('placement', v);}} />
          {/* <ButtonRadio value={this.state.placement} options={[{ label: '中间', value: 'center'}, { label: '底部', value: 'bottom'}, { label: '顶部', value: 'top'}, { label: '左边', value: 'left'}, { label: '右边', value: 'right'} ]} onPress={v => {this.setModalVisibleByKey('placement', v);}} type='default' activeType="primary" /> */}

          <Text style={styles.title}>animateType</Text>
          <ScrollView horizontal>
            <ButtonRadio value={this.state.animateType} options={[{label: 'unset', value: ''}, 'scale', 'fade', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right']} onPress={v => {this.setModalVisibleByKey('animateType', v);}} />
          </ScrollView>

          <Text style={styles.title}>animateDuration</Text>
          <ButtonRadio value={this.state.animateDuration} options={[{label: 'unset', value: ''}, 100, 150, 200, 300, 400, 500, 600, 1000]} onPress={v => {this.setModalVisibleByKey('animateDuration', v);}} />

          <Text style={styles.title}>width</Text>
          <ButtonRadio value={this.state.width} options={[ {label: 'unset', value: ''}, 30, 50, 80, 150, 200, 300]} onPress={v => {this.setModalVisibleByKey('width', v);}} />

          <Text style={styles.title}>radius</Text>
          <ButtonRadio value={this.state.radius} options={[{label: 'unset', value: ''}, 0, 2, 5, 10, 20]} onPress={(v) => {this.setModalVisibleByKey('radius', v);}} />

          <Text style={styles.title}>closable</Text>
          <ButtonRadio value={this.state.closable} options={[true, false]} onPress={v => {this.setModalVisibleByKey('closable', v);}} />

          <Text style={styles.title}>mask</Text>
          <ButtonRadio value={this.state.mask} options={[true, false]} onPress={v => {this.setModalVisibleByKey('mask', v);}} />

          <Text style={styles.title}>maskClosable</Text>
          <ButtonRadio value={this.state.maskClosable} options={[true, false]} onPress={v => {this.setModalVisibleByKey('maskClosable', v);}} />

          <Text style={styles.title}>maskBgColor</Text>
          <ButtonRadio value={this.state.maskBgColor} options={['transparent', 'red', '#90ea3d', 'rgba(0,0,0,.6)', 'rgba(101,0,212,.5)']} onPress={(v) => {this.setModalVisibleByKey('maskBgColor', v); }} size="sm" />
        </ScrollView>

        <View style={{ margin: 20 }}>
          <Button type="primary" onPress={() => {this.setModalVisibleByKey('isShowModal', true);}}>Show</Button>
        </View>

        <Modal
          visible={this.state.isShowModal}
          placement={this.state.placement}
          animateType={this.state.animateType || undefined}
          animateDuration={this.state.animateDuration || undefined}
          width={this.state.width || undefined}
          radius={this.state.radius === '' ? undefined : this.state.radius}
          closable={this.state.closable}
          mask={this.state.mask}
          maskClosable={this.state.maskClosable}
          maskBgColor={this.state.maskBgColor}
        >
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={() => {this.setModalVisibleByKey('isShowModal', false);}}>Close</Button>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
});
