/**
 * @desc 将 16进制 颜色 转成 rgba 格式颜色
 * @param {string} color 颜色。16 进制颜色，形如 #fff 或者 #ffffff
 * @param {number} opacity 透明度。取值范围 0-1
 * @param {boolean} isNumber 是否返回 rgb 数值，形如 [255,255,255]
 * @return {string|array} 返回 字符串，或者数组，形如 rgba(255,255,255, 0.1) 或者 [255,255,255]
 */
export const HexToRgba = (color, opacity, isNumber) => {
  let colorLength = color.length;
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (color && reg.test(color)) {
    let sColorChange = [];
    if (colorLength === 4) {
      for (let i = 1; i < 4; i += 1) {
        sColorChange.push(parseInt(`${color.slice(i, i + 1)}${color.slice(i, i + 1)}`, 16));
      }
    } else {
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`${color.slice(i, i + 2)}`, 16));
      }
    }
    if (isNumber) {
      return sColorChange.concat(opacity);
    }
    return `rgba(${sColorChange.join(',')},${opacity})`;
  }
  return color;
};

/**
 * @desc 将 16进制 颜色 转成 rgb 格式颜色
 * @param {string} color 颜色。16 进制颜色，形如 #fff 或者 #ffffff
 * @param {boolean} isNumber 是否返回 rgb 数值，形如 [255,255,255]
 * @return {string|array} 返回 字符串，或者数组，形如 rgba(255,255,255) 或者 [255,255,255]
 */
export const HexToRgb = (color, isNumber) => {
  let colorLength = color.length;
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (color && reg.test(color)) {
    let sColorChange = [];
    if (colorLength === 4) {
      for (let i = 1; i < 4; i += 1) {
        sColorChange.push(parseInt(`${color.slice(i, i + 1)}${color.slice(i, i + 1)}`, 16));
      }
    } else {
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`${color.slice(i, i + 2)}`, 16));
      }
    }
    if (isNumber) {
      return sColorChange;
    }
    return `rgb(${sColorChange.join(',')})`;
  }
  return color;
};

/**
 * @desc 将 rgb 格式颜色 转成 16进制 颜色
 * @param {string} color 颜色。rgb 格式颜色，形如 rgb(255,255,255)
 * @return {string} 返回 16进制颜色，形如 #ffffff;
 */
export const RgbToHex = color => {
  const colorArr = color.replace(/[rgb|(|)]/gi, '').split(',');
  const hexArr = colorArr.map(item => {
    let hexItem = parseInt(item).toString(16);
    if(hexItem.length === 1) {
      return `0${hexItem}`;
    }
    return hexItem;
  });
  return `#${hexArr.join('')}`;
};

/**
 * @desc 加深 16进制 颜色
 * @param {string} color 颜色。16 进制 颜色，形如 #ffffff
 * @param {number} level 加深程度。取值范围 0-1
 * @param {boolean} isHex 是否返回 16进制颜色。true 返回 #ffffff；false 则返回 rgba(255,255,255)
 * @return {string} 返回 16进制颜色，形如 #ffffff 或者 rgba(255,255,255);
 */
export const getDarkColor = (color, level, isHex) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (color && reg.test(color)) {
    let rgbColorArr = HexToRgb(color, true);
    let rgbColorArrNew = rgbColorArr.map(item => Math.floor(item * (1 - level)));
    let rgbColor = `rgb(${rgbColorArrNew.join(',')})`;
    return isHex ? RgbToHex(rgbColor) : rgbColor;
  }
  return color;
};

/**
 * @desc 变浅 16进制 颜色
 * @param {string} color 颜色。16 进制 颜色，形如 #ffffff
 * @param {number} level 变浅程度。取值范围 0-1
 * @param {boolean} isHex 是否返回 16进制颜色。true 返回 #ffffff；false 则返回 rgba(255,255,255)
 * @return {string} 返回 16进制颜色，形如 #ffffff 或者 rgba(255,255,255);
 */
export const getLightColor = (color, level, isHex) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (color && reg.test(color)) {
    let rgbColorArr = HexToRgb(color, true);
    let rgbColorArrNew = rgbColorArr.map(item => Math.floor((255 - item) * level + item));
    let rgbColor = `rgb(${rgbColorArrNew.join(',')})`;
    return isHex ? RgbToHex(rgbColor) : rgbColor;
  }
  return color;
};