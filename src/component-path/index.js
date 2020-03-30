export * from '../components'; // 本地调试
// export * from '../../dist'; // 发布前测试包
// export * from '../../node_modules/durain-ui';

/*
这里之所以 要加 '../../node_modules'，是因为当 dist 目录下 的 package.json 存在时，
直接从 ’react-native-unit-zjp‘ 引入组件，会指向 dist 目录。
从这点可以得出，如果想要以特定名称引入某文件时，不想写长长的路径的话，可以在该目录下，新建一个pacakage.json 然后指定它的 name 就可以了。
*/