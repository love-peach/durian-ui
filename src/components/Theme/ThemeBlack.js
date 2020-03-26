import { PixelRatio } from 'react-native';

// 像素大小。通常用于边框粗细
const pixelSize = (function() {
  let pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) return 0.3333333333333333;
  else if (pixelRatio >= 2) return 0.5;
  else return 1;
})();

const color = {
  white: '#fff',

  primary: '#22353c',
  info: '#dea26c',
  warning: '#6f4837',
  success: '#3d272a',
  error: '#05080d',
  golden: '#a26e49',

  grayDark: '#c5c8ce',
  gray: '#dcdfe5',
  grayLight: '#f7f8fa',

  bg: '#f0f3f9',

  border: '#f0f1f5',
  borderDark: '#e0e2e7',

  titleMain: '#121b33',
  title: '#394259',
  titleSub: '#868f9e',
  textPlaceholder: '#b2b6bf',
  textTip: '#cccfd9',
  textTipAlert: '#fe6666',
};

export default {
  ...color,
  pixelSize,

  // btn - background color
  btn_bg_default: color.gray,
  btn_bg_primary: color.primary,
  btn_bg_info: color.info,
  btn_bg_warning: color.warning,
  btn_bg_success: color.success,
  btn_bg_error: color.error,
  btn_bg_gray: color.grayLight,
  btn_bg_golden: color.golden,
  btn_bg_text: 'transparent',
  btn_bg_disabled: color.gray,

  // btn - text color
  btn_text_default: color.white,
  btn_text_primary: color.white,
  btn_text_info: color.white,
  btn_text_warning: color.titleMain,
  btn_text_success: color.white,
  btn_text_error: color.white,
  btn_text_gray: color.titleSub,
  btn_text_golden: color.titleMain,
  btn_text_text: color.primary,
  btn_text_disabled: color.white,

  // btn - height
  btn_height_xs: 20,
  btn_height_sm: 25,
  btn_height_md: 32,
  btn_height_lg: 40,
  btn_height_xl: 50,

  // btn - min-width
  btn_min_width_xs: 20,
  btn_min_width_sm: 25,
  btn_min_width_md: 32,
  btn_min_width_lg: 40,
  btn_min_width_xl: 50,

  // btn - font size
  btn_font_size_xs: 9,
  btn_font_size_sm: 12,
  btn_font_size_md: 13,
  btn_font_size_lg: 18,
  btn_font_size_xl: 18,

  // btn - font weight
  btn_font_weight_xs: '400',
  btn_font_weight_sm: '400',
  btn_font_weight_md: '400',
  btn_font_weight_lg: '400',
  btn_font_weight_xl: '600',

  // btn padding Horizontal
  btn_padding_horizontal_xs: 4,
  btn_padding_horizontal_sm: 4,
  btn_padding_horizontal_md: 5,
  btn_padding_horizontal_lg: 12,
  btn_padding_horizontal_xl: 18,

  // btn padding Vertical 暂时没用到
  btn_padding_vertical_xs: 2,
  btn_padding_vertical_sm: 4,
  btn_padding_vertical_md: 6,
  btn_padding_vertical_lg: 9,
  btn_padding_vertical_xl: 14,

  // btn - radius
  btn_radius_rect: 0,
  btn_radius_radius: 5,
  btn_radius_circle: 1000,

  // btn - border-width
  btn_border_width: pixelSize,

  // btn-group width
  btn_group_width_xs: 20,
  btn_group_width_sm: 25,
  btn_group_width_md: 32,
  btn_group_width_lg: 40,
  btn_group_width_xl: 50,

  // cell font-size
  cell_font_size_title: 15,
  cell_font_size_value: 15,
  cell_font_size_value_place: 15,
  cell_font_size_label: 13,
  cell_font_size_extra: 13,

  // cell color
  cell_color_title: color.titleMin,
  cell_color_value: color.titleMin,
  cell_color_value_place: color.titleSub,
  cell_color_label: color.titleSub,
  cell_color_extra: color.titleSub,

  // mask bg
  mask_bg: 'rgba(0,0,0,0.6)',

  // input color
  input_color_label: color.titleMain,
  input_color_input: color.titleMain,
  input_color_tip: color.textTip,

  // input font-size
  input_font_size_label: 15,
  input_font_size_label_top: 12,
  input_font_size_input: 15,
  input_font_size_tip: 13,

  // input font-weight
  input_weight_label: 'normal',
  input_weight_input: '500',
  input_weight_tip: 'normal',

  // 分割线高亮颜色
  split_line_active_color: color.primary,
};
