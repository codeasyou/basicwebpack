source-map ：一种 提供源代码到构建后代码映射 技术（如果构建后代码出错了，通过映射可以追踪到源代码）

在 package.json 中配置 devtool:"source-map"

其中可供选择的配置项包含以下几种：
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

source-map：外部
    显示了错误代码的准确信息，和 源代码的错误位置

inline-source-map：内联
    只生成一个内联 source-map
    显示了错误代码的准确信息，和 源代码的错误位置

hidden-source-map:外部
    显示了错误代码的准确信息，但未显示源代码的错误位置
    不能追踪源代码错误，只能提示到构建后代码的错误位置

eval-source-map:内联
    显示了错误代码的准确信息，和 源代码的错误位置
    每一个文件都生成对应的source-map, 都在eval

nosources-source-map:外部
    显示了错误代码的准确信息，但没有任何源代码信息

cheap-module-source-map:外部


内联 和 外部 的区别：
1. 外部生成了文件，内联没有
2. 内联构建速度更快


开发环境：速度快，调试更友好
    速度快 eval>inline>cheap>...
    eval-cheap-source-map
    eval-source-map
    调试更友好
    source-map
    cheap-module-source-map
    cheap-source-map

因此，开发环境下最好的设置是
---> eval-source-map

生产环境：源代码要不要隐藏？调试要不要更友好
    内联会让代码体积变得非常大,所以在生产环境下一般不用内联
    nosources-source-map 全部隐藏
    hidden-source-map 之隐藏源代码，会提示构建后代码错误信息
    source-map  让调试更加友好
--->source-map    