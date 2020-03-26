import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Picker } from 'react-native';
import { ButtonRadio, Button, Popup, Cell, CellGroup, PopupHeader } from '../component-path';

export default class PopupDemo extends Component {
  static navigationOptions = () => ({
    title: 'PopupDemo',
  });

  state = {
    isShow: false,
    maskClosable: false,
    header: false,
    language: 'js',
  };

  setValueByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  handleMaskPress() {}

  render() {
    return (
      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>

          <Text style={styles.styles}>maskClosable</Text>
          <ButtonRadio
            value={this.state.maskClosable}
            options={[{label: 'false', value: false}, {label: 'true', value: true}]}
            onPress={(v) => {this.setValueByKey('maskClosable', v); }}
          />

          <Text style={styles.title}>header</Text>
          <ButtonRadio
            value={this.state.header}
            options={[{label: 'false', value: false}, {label: 'true', value: true}]}
            onPress={(v) => {this.setValueByKey('header', v); }}
          />

          <Button style={{ marginTop: 10 }} type="primary" onPress={this.setValueByKey.bind(this, 'isShow', true)}>show</Button>
        </View>

        <Text>{this.state.language}</Text>
        
        <Popup
          visible={this.state.isShow}
          maskClosable={this.state.maskClosable}
          onMaskPress={() => {this.setValueByKey('isShow', false); }}
          onCancelPress={() => {this.setValueByKey('isShow', false); }}
        >
          {this.state.header ? <PopupHeader title='选择期数' /> : null}
          <CellGroup style={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" onPress={() => {this.setValueByKey('isShow', false); }} />
            <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
            <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
            <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          </CellGroup>

          <Picker
            selectedValue={this.state.language}
            style={{ height: 210 }}
            onValueChange={(itemValue) =>
              this.setValueByKey('language', itemValue)
            }
          >
            <Picker.Item label="Html" value="html" />
            <Picker.Item label="Css" value="css" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="VUe" value="vue" />
            <Picker.Item label="React" value="react" />
            <Picker.Item label="React-Native" value="rn" />
          </Picker>
        </Popup>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});
