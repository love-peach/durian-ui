import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Button, Cell, CellGroup } from '../component-path';

const icon = require('../icons/close.png');


export default class CellDemo extends Component {
  static navigationOptions = () => ({
    title: 'CellDemo',
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Cell title="ttile" value="value" label="label" extra="extra" />
        <Cell title="图标" value="420.0" icon={icon} />
        <Cell title="图标可以是组件" value="420.0" icon={<Button size="sm" shape="radius" type="success">+</Button>} />
        <Cell
          title="指示器"
          link
          onPress={() => {
            alert(123);
          }}
        />
        <Cell title="可以是组件" value={<Button size="sm" shape="radius" type="error">1231</Button>} />
        <Cell title="验证码" value={<Button size="md" shape="radius" outline type="primary" outlineColor="#f00">获取验证码</Button>} />
        <Cell title="label 可以很长" label="Lorem ipsum dolor, sit amet consectetur adipisicing elit.Lorem ipsum dolor, sit amet consectetur adipisicing elit." />

        <Cell title="没有下划线" line={false} />
        <Cell title="可以设置两边间距" containerStyle={{ paddingHorizontal: 10 }} onPress={() => {console.log(1);}} />
        <Cell title="这样也可以，注意看下划线的间距" containerWrapStyle={{ paddingHorizontal: 10 }} onPress={() => {console.log(1);}} />


        <CellGroup style={{ marginVertical: 20 }}>
          <Cell title="CellGroup" />
          <Cell title="CellGroup" />
        </CellGroup>

        <CellGroup style={{ marginVertical: 20 }} paddingOffset={30}>
          <Cell title="控制左右间距" />
          <Cell title="控制左右间距" />
        </CellGroup>

        <CellGroup style={{ marginVertical: 20 }} borderOffset={70}>
          <Cell title="控制下滑线间距" />
          <Cell title="控制下滑线间距" />
        </CellGroup>

        <CellGroup style={{ marginVertical: 20 }}>
          <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
        </CellGroup>
      </ScrollView>
    );
  }
}
