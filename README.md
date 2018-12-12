# select-mobile-num
靓号选择


## 安装nodejs环境


## 运行

```
node index.js
```

会在项目data目录生成 靓号.xlsx 文件

## 参数配置

目前号码选择，支持

 * 连续相同数字如 1111
 * 叠数如 1212
 * 支持连续的相邻数字如 1234
 * 支持对称数字如 1221

相关配置如下：

```

//连续相同数字个数
const UNINTERRUPTED_SAME_NUM_COUNT = 4;


//叠字个数
const OVERLAP_NUM = 2;


//连续相邻数字个数
const UNINTERRUPTED_NEIGHBOUR_NUM_COUNT = 4;

//号码前缀不参与选择字符串类型
const PREFIX = "5660";

//开始号码
const START_NUM = 4000;

//结束号码
const END_NUM = 9999;
```
