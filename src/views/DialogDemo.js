import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Button, Dialog } from '../component-path';

export default class DialogDemo extends Component {
  static navigationOptions = () => ({
    title: 'DialogDemo',
  });

  state = {
    menus: 'one',
    isShow: false,
    maskClosable: false,
    header: false,
    menusObj: {
      one: [
        {
          label: '我知道了',
        }
      ],
      two: [
        {
          label: '取消',
          type: 'error',
        },
        {
          label: '确定',
          type: 'success',
        }
      ],
      three: [
        {
          label: '取消',
        },
        {
          label: '挂起',
          disabled: true,
        },
        {
          label: '确定',
          color: 'red',
          backgroundColor: 'yellow',
          onPress: (v) => {
            console.log(v, 'item');
          }
        },
      ],
    }
  };

  setValueByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  handleMaskPress() {}

  render() {
    return (
      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>

          <Text style={styles.title}>menus</Text>
          <ButtonRadio
            value={this.state.menus}
            options={['one', 'two', 'three']}
            onPress={(v) => {this.setValueByKey('menus', v); }}
          />

          <Button style={{ marginTop: 10 }} type="primary" onPress={this.setValueByKey.bind(this, 'isShow', true)}>show</Button>
        </View>

        <Text>{JSON.stringify(this.state.menusObj[this.state.menus])}</Text>

        
        <Dialog
          visible={this.state.isShow}
          onCancelPress={() => {this.setValueByKey('isShow', false); }}
          onMenuPress={(v) => {
            console.log(v, 'menu');
            this.setValueByKey('isShow', false);
          }}
          title="弹框标题"
          msg="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
          menus={this.state.menusObj[this.state.menus]}
        >
        </Dialog>
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
