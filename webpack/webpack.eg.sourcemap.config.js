const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: './entry/eg.entry.js',
    devtool: 'source-map',
    output: {
      filename: 'eg.sourcemap.output.js',
      path: path.resolve(__dirname, './output'),
      libraryTarget: 'commonjs2'
    },
  }
];

/**
 sourcemap 参考：https://www.cnblogs.com/Wayou/p/understanding_frontend_source_map.html

 “feel the force” ⇒ Yoda ⇒ “the force feel”

 1、【最初】mappings(283 字符): 1|0|Yoda_input.txt|1|5, 1|1|Yoda_input.txt|1|6, 1|2|Yoda_input.txt|1|7, 1|4|Yoda_input.txt|1|9, ...
 (输出内容第1行第0列 对应 text输入内容第1行第5列)

 2、【省去输出文件的行号】mappings (245 字符): 0|Yoda_input.txt|1|5, 1|Yoda_input.txt|1|6, 2|Yoda_input.txt|1|7, 4|Yoda_input.txt|1|9, ...

 3、 可符号化提取
 单词变量  names: ['the','force','feel']
 那么可以得到 mappings: 0|Yoda_input.txt|1|5|0, 4|Yoda_input.txt|1|9|1，10|Yoda_input.txt|1|0|2
 文件名变量  sources: ['Yoda_input.txt']
 那么可以得到 mappings: 0|0|1|5|0, 4|0|1|9|1, 10|0|1|0|2

 4、记录相对上一个的位置
 mappings: 0|0|1|5|0, 4|0|1|9|1, 10|0|1|0|2
 0|0|1|5|0, 4|0|1|9|1
 mappings：0|0|1|5|0, 4|0|1|4|1, 6|0|1|-9|1

 5、VLQ 二进制
 1｜23｜456｜7  => 1｜10111｜111001000｜111

 1 = [C0]0001[S0]  // 第一位标示是否结束  最后一位标示正负数
 1 0111 = [C1]0111[S0]  000001
 11100 1000 = [C1]1000[S0] 011100
 111 = [C0]0111[S0]

 二进制：000010 101110 000001 110000 011100 001110
 base64: CuBwcO     // 依据base64编码表： https://image.fundebug.com/20181012_base64-map.png

 6、略去不必要字段，省略其中某些字段后，一个编码片段就不一定是5位了，他的长度有可能为1，4或者5。
 5 - 包含全部五个部分：输出文件中的列号，输入文件索引，输入文件中的行号，输入文件中的列号，符号索引
 4 - 输出文件中的列号，输入文件索引，输入文件中的行号，输入文件中的列号
 1 - 输出文件中的列号

 */

