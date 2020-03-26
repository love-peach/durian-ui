import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputItem, InputItemGroup, Button, ButtonGroup } from '../component-path';

const iconDemo = require('../icons/phone_green.png');

export default class InputDemo extends Component {
  static navigationOptions = () => ({
    title: 'InputDemo',
  });

  constructor(props) {
    super(props);
    this.state = {
      value: '333'
    };
  }

  handleChangeValue(value, fild) {
    this.setState({
      [fild]: value,
    });
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">

        <View>
          <Text style={styles.titleText}>默认样式:</Text>
          <InputItem />

          <Text style={styles.titleText}>labelPosition</Text>
          <InputItem label="默认在左边" />
          <InputItem label="也可以在顶部" labelPosition="top" />
          <InputItem placeholder="或者放这里" />

          <Text style={styles.titleText}>labelWidth</Text>
          <InputItem label="邮箱" type="email" labelWidth={70} />
          <InputItem label="手机号" type="phone" labelWidth={70} />
          <InputItem label="家庭住址" labelWidth={70} />

          <Text style={styles.titleText}>labelAlign</Text>
          <InputItem labelAlign="right" label="邮箱" type="email" labelWidth={70} />
          <InputItem labelAlign="right" label="手机号" type="phone" labelWidth={70} />
          <InputItem labelAlign="right" label="家庭住址" labelWidth={70} />
          

          <Text style={styles.titleText}>icon</Text>
          <InputItem icon={iconDemo} />

          <Text style={styles.titleText}>extra</Text>
          <InputItem label="验证码" extra={<Button size="sm" type="primary"> 发送验证码 </Button>} />

          <Text style={styles.titleText}>textAlign</Text>
          <InputItem label="默认输入文字靠左" />
          <InputItem label="设置输入文字靠右" textAlign="right" />

          <Text style={styles.titleText}>tip</Text>
          <InputItem label="姓名" tip="姓名不可超过10个字符" />

          <Text style={styles.titleText}>type</Text>
          <InputItem label="card" type="card" />
          <InputItem label="email" type="email" />
          <InputItem label="phone" type="phone" />
          <InputItem label="number" type="number" />
          <InputItem label="password" type="password" />
          <InputItem label="不显示控制眼睛" type="password" showPasswordControl={false} />
          <InputItem placeholder="textarea" type="textarea" borderColor="#C9CDD5" numberOfLines={6} maxLength={70} />

          <Text style={styles.titleText}>ref</Text>
          <ButtonGroup>
            <Button type="primary" onPress={() => {
              this.refFun.focus();
            }}>聚焦</Button>
          </ButtonGroup>
          <InputItem label="ref phone" type="card" inputRef={ref => this.refFun = ref} />

          <Text style={styles.titleText}>InputItemGroup</Text>
          <InputItemGroup paddingOffset={30}>
            <InputItem label="体重" type="number" labelWidth={70} extra="kg" />
            <InputItem label="银行卡号" type="card" labelWidth={70} />
            <InputItem label="手机号" type="phone" labelWidth={70} />
            <InputItem label="邮箱"  type="email" labelWidth={70} />
            <InputItem label="家庭住址" labelWidth={70} />
          </InputItemGroup>
        </View>
        
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
});
