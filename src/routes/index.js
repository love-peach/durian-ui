import { createStackNavigator } from 'react-navigation-stack';

import Home from '../views/Home';

import ThemeDemo from '../views/ThemeDemo';
import ButtonDemo from '../views/ButtonDemo';
import ButtonGroupDemo from '../views/ButtonGroupDemo';
import ButtonRadioDemo from '../views/ButtonRadioDemo';
import CellDemo from '../views/CellDemo';
import InputDemo from '../views/InputDemo';
import TipDemo from '../views/TipDemo';
import ModalDemo from '../views/ModalDemo';
import PopupDemo from '../views/PopupDemo';
import ActionSheetDemo from '../views/ActionSheetDemo';
import DialogDemo from '../views/DialogDemo';
import ToastDemo from '../views/ToastDemo';
import CarouselDemo from '../views/CarouselDemo';

const RootStack = createStackNavigator(
  {
    Home: Home,
    ThemeDemo: ThemeDemo,
    ButtonDemo: ButtonDemo,
    ButtonGroupDemo: ButtonGroupDemo,
    ButtonRadioDemo: ButtonRadioDemo,
    ModalDemo: ModalDemo,
    CellDemo: CellDemo,
    InputDemo: InputDemo,
    TipDemo: TipDemo,
    PopupDemo: PopupDemo,
    ActionSheetDemo: ActionSheetDemo,
    DialogDemo: DialogDemo,
    ToastDemo: ToastDemo,
    CarouselDemo: CarouselDemo,
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack;
