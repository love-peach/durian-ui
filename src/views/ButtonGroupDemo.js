import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, ButtonGroup } from '../component-path';


export default class ButtonGroupDemo extends Component {
  static navigationOptions = () => ({
    title: 'ButtonGroupDemo',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  pressEvent() {
    console.log('click1');
  }

  longPressEvent() {
    console.log('long');
  }


  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.title}>size</Text>
          <ButtonGroup style={styles.btnGroupWrap} radius={100} size="xs">
            <Button type="primary"></Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} size="xs">
            <Button type="primary">是</Button>
            <Button type="error">否</Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} size="sm">
            <Button backgroundColor="red">红</Button>
            <Button backgroundColor="green">绿</Button>
            <Button backgroundColor="blue">蓝</Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} size="md">
            <Button backgroundColor="green">春</Button>
            <Button backgroundColor="yellowgreen">夏</Button>
            <Button backgroundColor="#fa8f04">秋</Button>
            <Button backgroundColor="#8ac7fd">冬</Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} size="lg">
            <Button backgroundColor="green">金</Button>
            <Button backgroundColor="yellowgreen">木</Button>
            <Button backgroundColor="#fa8f04">水</Button>
            <Button backgroundColor="#8ac7fd">火</Button>
            <Button backgroundColor="#8ac7fd">土</Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} size="xl">
            <Button backgroundColor="green">上</Button>
            <Button backgroundColor="yellowgreen">下</Button>
            <Button backgroundColor="#fa8f04">前</Button>
            <Button backgroundColor="#8ac7fd">后</Button>
            <Button backgroundColor="#8ac7fd">左</Button>
            <Button backgroundColor="#8ac7fd">右</Button>
          </ButtonGroup>
          <Text style={styles.title}>redius</Text>

          <ButtonGroup style={styles.btnGroupWrap} radius={0}>
            <Button type="primary">0</Button>
            <Button type="primary">0</Button>
            <Button type="primary">0</Button>
          </ButtonGroup>

          <ButtonGroup style={styles.btnGroupWrap} radius={6}>
            <Button type="info">6</Button>
            <Button type="info">6</Button>
            <Button type="info">6</Button>
          </ButtonGroup>

          <ButtonGroup style={styles.btnGroupWrap} radius={12}>
            <Button type="success">12</Button>
            <Button type="success">12</Button>
            <Button type="success">12</Button>
          </ButtonGroup>

          <ButtonGroup style={styles.btnGroupWrap} radius={20}>
            <Button type="error">20</Button>
            <Button type="error">20</Button>
            <Button type="error">20</Button>
          </ButtonGroup>

          <Text style={styles.title}>ghost</Text>
          <ButtonGroup style={styles.btnGroupWrap} ghost>
            <Button type="golden">1#</Button>
            <Button type="golden">2#</Button>
            <Button type="golden">3#</Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} ghost>
            <Button type="primary">1#</Button>
            <Button type="golden">2#</Button>
            <Button type="golden">3#</Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} ghost>
            <Button type="golden">1#</Button>
            <Button type="warning" ghost={false}>2#</Button>
            <Button type="golden">3#</Button>
          </ButtonGroup>
          <ButtonGroup style={styles.btnGroupWrap} radius={0} ghost>
            <Button type="primary" ghost={false}>1#</Button>
            <Button type="primary">2#</Button>
            <Button type="primary" outlineType="dashed">3#</Button>
          </ButtonGroup>

          <Text style={styles.title}>vertical</Text>
          <ButtonGroup style={styles.btnGroupWrap} vertical>
            <Button type="warning">1#</Button>
            <Button type="warning">2#</Button>
            <Button type="warning">3#</Button>
          </ButtonGroup>
          <ButtonGroup style={[styles.btnGroupWrap, { position: 'absolute', bottom: 0, right: 5}]} ghost vertical>
            <Button type="warning">1#</Button>
            <Button type="warning" ghost={false}>2#</Button>
            <Button type="warning" outlineType="dashed">3#</Button>
          </ButtonGroup>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  btnGroupWrap: {
    margin: 5,
    // borderWidth: 2,
  }
});
