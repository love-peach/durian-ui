
# durain-ui

一套拿来就用的 react-native 纯 js 组件。

## TODO

- [x] Button
- [x] ButtonGroup
- [x] ButtonRadio
- [x] Cell
- [x] CellGroup
- [x] InputItem
- [x] Modal
- [x] Popup
- [x] Dialog
- [x] Toast
- [x] Tip
- [x] Carousel

## 组件使用说明

### Button

按钮组件，依赖插件 `react-native-linear-gradient` 来实现渐变效果

#### 代码示例

```html
<Button type="primary">primary</Button>

<Button gradient gradientColors={['#f00', '#0f0']}>渐变</Button>
```

#### API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
type | 按钮类型，可选值为 `default`、`primary`、`info`、`warning`、`success`、`error`、`gray`、`golden`、`text` | String | default
size | 按钮大小，可选值为 `xs`、`sm`、`md`、`lg`、`xl` | String | lg
shape | 按钮形状，可选值为 `rect`、`radius`、`circle` | String | circle
borderRadius | 圆角大小, 当 `shape` 为 `radius` 时，可通过此属性控制圆角大小 | Number | -
color | 设置按钮文字颜色 | String | -
backgroundColor | 设置按钮背景颜色 | String | -
ghost | 设置幽灵按钮 | Boolean | false
outlineType | 设置按钮边框类型，可选值为 `solid`、`dotted`、`dashed` | String | solid
outlineColor | 设置按钮边框颜色 | String | -
outlineWidth | 设置按钮边框粗细 | String | -
gradient | 设置渐变按钮 | Boolean | false
gradientColors | 设置渐变颜色 | Array | [info, primary]
gradientDirection | 设置渐变方向 | String | horizontal
gradientProps | 设置渐变其他属性。因为渐变是通过插件 `react-native-linear-gradient` 实现的 | Object | -
loading | 设置按钮为加载中状态 | Boolean | false
disabled | 设置按钮为禁用状态 | Boolean | false
icon | 设置按钮图标 | Object \| Function \| element | -
iconStyle | 设置按钮图标样式 | Object | -
iconOnRight | 设置按钮图标位置在右边 | Boolean | false
activityIndicatorColor | loading 指示器颜色 | String | 默认为文字颜色
containerStyle | 容器样式 | Object | -
clickInterval | 连续两次点击间隔 毫秒 | Numer | 1000
onPress | 点击事件 | event | -
onLongPress | 长按事件 | event | -

### ButtonGroup

按钮组 组件

#### ButtonGroup 代码示例

```html
<ButtonGroup style={styles.btnGroupWrap} size="xs">
  <Button type="primary">是</Button>
  <Button type="error">否</Button>
</ButtonGroup>
```

#### ButtonGroup API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
size | 设置按钮组大小。可选值为：`xs`、`sm`、`md`、`lg`、`xl` | String | md
radius | 设置按钮组圆角大小。| Number | 1000
ghost | 设置幽灵按钮组 | Boolean | false
vertical | 设置垂直按钮组 | Boolean | false
style | 设置按钮组容器样式 | Object | -

### Cell

列表组件

#### Cell 代码示例

```html
<Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />

<Cell title="验证码" value={<Button size="md" shape="radius" outline type="primary" outlineColor="#f00">获取验证码</Button>} />

```

#### Cell API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
title | 标题 左上角 | String \| element | -
value | 值 右上角 | String \| element | -
valuePlace | 空值 placeholder | String \| element | -
label | 说明 左下角 | String \| element | -
extra | 附加 右下角 | String \| element | -
titleStyle | 标题样式。同理，还有 `valueStyle`、 `labelStyle`、`extraStyle`、`valuePlaceStyle` | Object | -
icon | 设置图标 最左边 | Object \| Function \| element | -
iconStyle | 图标样式 | Object | -
link | 设置箭头样式 | Boolean | false
indicator | 设置指示器 最右边。预设可选值为`arrow`、`plus`当给定 `onPress` 后，默认为小箭头 | Object \| Function \| element | arrow
indicatorDirection | 指示器方向 可选值为 `up`、`down` | String | -
indicatorStyle | 指示器样式 | Object | -
line | 设置底部分割线 | Boolean | -
lineStyle | 分割线样式 | Object | -
containerWrapStyle | 容器外层样式 包含内容 和 分割线 | Object | -
containerStyle | 容器样式 包含 icon 文字 和 指示器 | Object | -
activeOpacity | 点击透明度，同 TouchableHighlight 属性。当给定 `onPress` 后，默认为 0.5 | Number | 0.5 \| 1
underlayColor | 底色，同 TouchableHighlight 属性。当给定 `onPress` 后，默认为 #eee | String | #eee \| transparent
clickInterval | 点击间隔 毫秒 | Number | 0
onPress | 点击事件 | Function | -

### CellGroup

列表容器组件

#### CellGroup 代码示例

```html
<CellGroup style={{ marginVertical: 20 }} borderOffset={0}>
  <Cell title="2/1期" value="420.0" />
  <Cell title="2/1期" value="420.0" />
  <Cell title="2/1期" value="420.0" />
  <Cell title="2/1期" value="420.0" />
</CellGroup>
```

#### CellGroup API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
paddingOffset | 内部 cell 左右间距 | Number | 12
style | 容器样式 | Object | -

### InputItem

输入框组件

#### InputItem 代码示例

```html
<InputItem label="手机号" />

<InputItem label="密码" type="password" value= {this.state.value1} />
```

#### InputItem API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
type | 输入框类型。可选值为 `textarea`、`number`、`password` | String | default
label | 标签文字 | String | -
labelPosition | 标签位置。可选值为 `top`、`left`、`inside`。| String | left
labelWidth | 标签宽度 | Number | -
lableAlign | 标签对齐方式。可选值为 `left`、`right` | String | left
labelStyle | 标签样式 | Object | -
icon | 图标 | Object \| Function \| element | -
iconStyle | 图标样式 | Object | -
line | 设置底部分割线 | Boolean | -
lineColor | 设置分割线颜色 | String | Theme.border
lineColorActive | 设置分割线高亮颜色 | String | Theme.split_line_active_color
lineStyle | 分割线样式 | Object | -
showPasswordControl | 是否显示密码明文控制。当 type 为 `password` | Boolean | -
extra | 最右边部分 | String \| Element | -
extraStyle | 最右边部分样式 | Object | -
tip | 底部提示 | String \| Element | -
tipStyle | 底部提示样式 | Object | -
inputStyle | 输入框样式 | Object | -
style | 容器样式 | Object | -
inputRef | ref。暂时没有搞明白，怎么通过 ref 转发，或者高阶组件的方式实现，只能通过传递属性实现，并且只能是函数 | Function | -
textAlign | 输入框内文字方向。`TextInput` 原生属性。可选值为 `left`、`right` | String | left
placeholder | 占位符。`TextInput` 原生属性 | String | 请输入
placeholderTextColor | 占位符文字颜色 。`TextInput` 原生属性 | String | -
maxLength | 限制文本框中最多的字符数。当 type 为 `textarea` 时，会显示出来。 `TextInput` 原生属性 | Number | -
keyboardType | 键盘类型。`TextInput` 原生属性 | String | -
clearButtonMode | 如何展示清除按钮。`TextInput` 原生属性 | String | -

### SplitLine

下划线

#### SplitLine 代码示例

```html
<SplitLine />
```

#### SplitLine API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
width | 下划线宽度。数字 或者 百分比 '50%' | number \| string | -
type | 下换线类型。可选值为`solid`、`dotted`、`dashed` | String | solid
color | 下划线颜色 | String | Theme.border
size | 下划线粗细 | Number | Theme.pixelSize
opacity | 下划线透明度 | number | 0.9
style | 自定义下划线样式 | Object | -

### Tip

提示组件

#### Tip 代码示例

```html
<Tip type="error" radius={0}>radius: 0</Tip>

<Tip icon={tipIcon} extra={<Button type="primary" size="xs">立即拨打</Button>}>客服热线：400-0000-0000</Tip>
```

#### Tip API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
type | 主题类型，可选值为 `primary`、`info`、`warning`、`success`、`error`、`gray`、`golden` | String | primary
title | 标题。| String | -
color | 自定义主题颜色。边框颜色就是这个值。背景颜色会根据这个颜色变浅。| String | -
radius | 圆角大小 | Number | 4
icon | 左边图标 | Object | -
iconStyle | 图标样式 | Object | -
extra | 右边追加内容 | String \| Element | -
extraStyle | 右边追加内容样式 | Object | -
style | 容器样式 | Object | -
children | 提示文字 | String \| Element | -

### Carousel

轮播图组件。这个照搬 [teaset](https://github.com/rilyu/teaset) 的

#### Carousel 代码示例

```html
<Carousel
  style={{ height: 100 }}
  horizontal={this.state.horizontal}
  autoPlay={this.state.autoPlay}
  loop={this.state.loop}
  interval={this.state.interval}
  direction={this.state.direction}
  startIndex={this.state.startIndex}
  control={this.state.control}
>
  <View style={{ backgroundColor: Theme.primary, height: '100%' }}><Text>1</Text></View>
  <View style={{ backgroundColor: Theme.info, height: '100%' }}><Text>2</Text></View>
  <View style={{ backgroundColor: Theme.success, height: '100%' }}><Text>3</Text></View>
  <View style={{ backgroundColor: Theme.warning, height: '100%' }}><Text>4</Text></View>
  <View style={{ backgroundColor: Theme.error, height: '100%' }}><Text>5</Text></View>
</Carousel>
```

#### Carousel API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
horizontal | 水平轮播还是垂直轮播 | Boolean | true
autoPlay | 自动轮播 | Boolean | true
interval | 每页停留时间 | Number | 3000
direction | 方向 | 可选值为 `forward`、`backward` | forward
startIndex | 初始显示的页数 | Number | 0
loop | 是否循环轮播 | Boolean | false
control | 指示器。为 `false` 则不显示指示器；若想自定义指示器，传递组件即可，会自动获取三个参数 {index, total, carousel }  | Boolean \| Element | false

### Modal

弹框组件

#### Modal 代码示例

```html
<Modal visible={this.state.isShowModal} width="90">
  {this.renderDemoText()}
  <Button type="primary" size="lg">Close</Button>
</Modal>
```

#### Modal API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
visible | 控制弹框显示隐藏 | Boolean | false
placement | 弹框出现位置。可选值为 `center`、`top`、`bottom`、`left`、`right` | String | -
animateType | 弹框动画方式。可选值为 `fade`、`scale`、`slide-top`、`slide-bottom`、`slide-right`、`slide-left`、 | String | -
animateDuration | 动画持续时间 | number | 200
width | 控制容器宽度。当其值不大于 100 时以百分比显示，大于 100 时为具体值 | Number | 100%
radius | 控制容器圆角大小 | number | 5
contentStyle | 容器样式 | Object | -
mask | 是否显示遮罩
maskClosable | 控制点击遮罩层是否可以关闭 | Boolean | false
maskBgColor | 遮罩层背景色 | String | rgba(0,0,0,0.6)
onMaskPress | 遮罩层点击事件 | Event | -
closable | 是否显示关闭按钮 | Boolean | false
closeStyle | 关闭按钮样式 | Object | -
onClosePress | 关闭事件 | Event | -
onRequestClose | 安卓必填。物理键返回函数。 | Function | -

### Popup

弹出组件。套用的是 `Modal` 组件，因此，`Modal` 的属性，同样适用于 该组件。

#### Popup 代码示例

```html
<Popup visible={this.state.isShow}>
  ...
</Popup>
```

#### Popup API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
visible | 控制弹框显示隐藏 | Boolean | false
placement | 弹框出现位置 | String | bottom
splitLineProps | 下划线属性 | Object | -

### PopupHeader

弹出组件的标题组件。

#### PopupHeader 代码示例

```html
<Popup visible={this.state.isShow}>
  <PopupHeader onLeftPress={} onRightPress={} />
  ...
</Popup>
```

#### PopupHeader API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
title | 标题 | string | -
leftText | 左边文字 | String | 取消
rightText | 右边文字 | String | 确认
onLeftPress | 左边点击事件 | Function | -
onRightPress | 左边点击事件 | Function | -
style | 自定义 header 样式 | Object | -

### ActionSheet

Action Sheet是由用户操作后触发的一种特定的模态弹出框。套用的是 `Modal` 组件，因此，`Modal` 的属性，同样适用于 该组件。

`menus` 数组，是 按钮 的属性对象，因此，可参考 `Button` 组件

#### ActionSheet 代码示例

```html
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
    this.setValueByKey('isShow', false);
  }}
>
  {this.renderDemoText()}
  <Button type="primary" size="lg" onPress={() => {this.setValueByKey('isShow', false); }}>close</Button>
</ActionSheet>
```

#### ActionSheet API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
visible | 控制弹框显示隐藏 | Boolean | false
menus | 菜单项列表 | array | -
theme | 菜单风格。可选值为`ios`、`android` | String | ios
onMenuPress | 点击菜单回调事件 | Function | -
showCancel | 显示取消按钮 | Boolean | false
cancelText | 取消按钮文字 | number | 0.9
onCancelPress | 点击取消事件 | Function | -
cancelProps | 取消按钮属性 | Object | -
maskClosable | 背景遮罩是否可点击 | Boolean | true
header.title | 标题 | String \| Element | -
header.titleSub | 副标题 | String \| Element | -

### Dialog

对话框组件，套用的是 `Modal` 组件，因此，`Modal` 的属性，同样适用于 该组件。

`menus` 数组，是 按钮 的属性对象，因此，可参考 `Button` 组件

#### Dialog 代码示例

```html
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
```

#### Dialog API 说明

属性 | 说明 |  类型 | 默认值
-| - | - | -
visible | 控制弹框显示隐藏 | Boolean | false
menus | 操作菜单项列表 | array | -
title | 标题 | String | -
msg | 副标题 | String | -
onMenuPress | 点击菜单回调事件 | Function | -

## 参考

非常感谢 [teaset](https://github.com/rilyu/teaset) 这个项目，学到很多。
