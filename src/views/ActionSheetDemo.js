import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Button, ActionSheet } from '../component-path';


const headerObj = {
  title: { title: '确定删除吗？'},
  titleSub: { titleSub: '删除后，就不可恢复哦，请谨慎操作'},
  both: { title: '确定删除吗？', titleSub: '删除后，就不可恢复哦，请谨慎操作'},
  custom: <View style={{backgroundColor: 'red', padding: 10 }}><Text>Element</Text></View>
};

const menusObj = {
  strArr: ['one', 'two', 'three'],
  objArr: [{label: 'one', value: '1'}, {label: 'two', value: '2'}, {label: 'three', value: '3'}],
  btnStyle: [{label: 'one', value: '1', color: 'red'}, {label: 'two', value: '2', backgroundColor: 'yellowgreen'}, {label: 'three', value: '3', disabled: true}, {label: 'itemClick', value: '4', type: 'success', onPress: (v) => {alert(v);}}],
};

export default class ActionSheetDemo extends Component {
  static navigationOptions = () => ({
    title: 'ActionSheetDemo',
  });

  state = {
    isShow: false,
    menus: 'strArr',
    theme: 'ios',
    maskClosable: true,
    showCancel: false,
    cancelText: '取消',
    header: '',
  };

  setValueByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.styles}>menus</Text>
          <ButtonRadio
            value={this.state.menus}
            options={['strArr', 'objArr', 'btnStyle']}
            onPress={(v) => {this.setValueByKey('menus', v); }}
          />

          <Text style={styles.styles}>theme</Text>
          <ButtonRadio
            value={this.state.theme}
            options={['ios', 'android']}
            onPress={(v) => {this.setValueByKey('theme', v); }}
          />

          <Text style={styles.styles}>maskClosable</Text>
          <ButtonRadio
            value={this.state.maskClosable}
            options={[false, true]}
            onPress={(v) => {this.setValueByKey('maskClosable', v); }}
          />

          <Text style={styles.styles}>showCancel</Text>
          <ButtonRadio
            value={this.state.showCancel}
            options={[false, true]}
            onPress={(v) => {this.setValueByKey('showCancel', v); }}
          />

          <Text style={styles.styles}>header</Text>
          <ButtonRadio
            value={this.state.header}
            options={[{label: 'unset', value: ''}, 'title', 'titleSub', 'both', 'custom']}
            onPress={(v) => {this.setValueByKey('header', v); }}
          />

          <Text style={styles.styles}>cancelText</Text>
          <ButtonRadio
            value={this.state.cancelText}
            options={['取消', 'cance', '关闭']}
            onPress={(v) => {this.setValueByKey('cancelText', v); }}
          />

          <Button style={{marginTop: 20}} type="primary" onPress={() => {this.setValueByKey('isShow', true); }}>show</Button>

          <Text>{JSON.stringify(menusObj[this.state.menus])}</Text>
        </View>

        <ActionSheet
          visible={this.state.isShow}
          theme={this.state.theme}
          onMaskPress={() => {this.setValueByKey('isShow', false); }}
          onCancelPress={() => {this.setValueByKey('isShow', false); }}
          menus={menusObj[this.state.menus]}
          maskClosable={this.state.maskClosable}
          showCancel={this.state.showCancel}
          cancelText={this.state.cancelText}
          header={this.state.header ? headerObj[this.state.header] : undefined}
          onMenuPress={(data) => {
            console.log(data, 'menu');
            this.setValueByKey('isShow', false); 
          }}
        ></ActionSheet>
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