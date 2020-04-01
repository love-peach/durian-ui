import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { Button, CellGroup, Cell } from '../component-path';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  goto(route) {
    this.props.navigation.navigate(route);
  }


  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      firstContact: null,
    };
  }

  getContacts = async() => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contact = data;
        console.log(contact);

        this.setState({
          firstContact: contact[0]
        });
      }
    } else {
      alert("需要打开通讯录权限！");
      return;
    }
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("需要打开相机权限！");
      return;
    } else {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
      if (!pickerResult.cancelled) {
        this.setState({
          selectedImage: {
            localUri: pickerResult.uri 
          },
        });
      }
    }
  }

  render() {
    return (
      <ScrollView>
        <Button type="primary" onPress={() => { this.getContacts(); }}>Contacts</Button>
        {this.state.firstContact ? <Text>{JSON.stringify(this.state.firstContact)}</Text> : null}
        <Button type="primary" onPress={() => { this.openImagePickerAsync(); }}>Pick a photo</Button>
        {this.state.selectedImage ? <Image source={{ uri: this.state.selectedImage.localUri }} style={{ height: 300, width: 300 }} /> : null}
        
        <CellGroup borderOffset={0}>
          <Cell title="ThemeDemo" link onPress={this.goto.bind(this, 'ThemeDemo')} />
          <Cell title="ButtonDemo" link onPress={this.goto.bind(this, 'ButtonDemo')} />
          <Cell title="ButtonGroupDemo" link onPress={this.goto.bind(this, 'ButtonGroupDemo')} />
          <Cell title="ButtonRadioDemo" link onPress={this.goto.bind(this, 'ButtonRadioDemo')} />
          <Cell title="CellDemo" link onPress={this.goto.bind(this, 'CellDemo')} />
          <Cell title="InputDemo" link onPress={this.goto.bind(this, 'InputDemo')} />
          <Cell title="TipDemo" link onPress={this.goto.bind(this, 'TipDemo')} />
          <Cell title="CarouselDemo" link onPress={this.goto.bind(this, 'CarouselDemo')} />
        </CellGroup>

        <CellGroup style={{ marginVertical: 20 }}>
          <Cell title="ModalDemo" link onPress={this.goto.bind(this, 'ModalDemo')} />
          <Cell title="PopupDemo" link onPress={this.goto.bind(this, 'PopupDemo')} />
          <Cell title="ActionSheetDemo" link onPress={this.goto.bind(this, 'ActionSheetDemo')} />
          <Cell title="DialogDemo" link onPress={this.goto.bind(this, 'DialogDemo')} />
          <Cell title="ToastDemo" link onPress={this.goto.bind(this, 'ToastDemo')} />
        </CellGroup>
      </ScrollView>
    );
  }
}
