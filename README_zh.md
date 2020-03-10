# react-colrow
[English](https://github.com/phphe/react-colrow/blob/master/README.md) | [中文](https://github.com/phphe/react-colrow/blob/master/README_zh.md)

Smarter layout components. Based on css flexbox. Support responsive design, Typescript, server side render. 5 KB gzipped.

更智能的布局组件. 基于css flexbox. 支持响应式布局, Typescript, 服务端渲染. 5 KB gzipped. 

提供Col(列), Row(行), BreakRow(断行)3个布局组件. 其中Col的宽度支持指定数字, 百分比, 自动增长. 支持不同的屏幕宽度设定不一样的列宽. Row可以设置gutter(沟槽, 列间距). 本项目通过css flexbox实现, 而不是js, 所以不用等到组件挂载到DOM, 所以支持ssr(服务端渲染).

我先开发的vue版本的[vue-colrow](https://github.com/phphe/vue-colrow/zh). react-colrow是之后用Typescript开发的. 所以不想再写一个重复的复杂文档. 如果你想了解更多, 可以参考vue-colrow的文档.

## 使用
```js
import {Row, Col, BreakRow, config} from 'react-colrow'
```
css包含在js里, 无需引入. Row, Col and BreakRow 是组件, `config` 是 [全局配置](https://vue-colrow.phphe.com/zh/api.html#config). 

## Demo
下面的截图来自vue-colrow, 使用本库效果是一样的.

![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form.png?raw=true)

小屏幕: 

![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form-xs.png?raw=true)

代码应该是:
```html
<Row>
  <Col width={300}><Card1 /></Col>
  <Col grow xs={1}>
    <Row>
      <Col width={1/3} xs={1/2}>
        <label>First Name</label><v-text-field solo></v-text-field>
      </Col>
      <Col width={1/3} xs={1/2}>
        <label>Last Name</label><v-text-field solo></v-text-field>
      </Col>
      <Col width={1/3} xs={1}>
        <label>Email</label><v-text-field solo></v-text-field>
      </Col>
      <Col width={3/5} xs={1}>
        <label>Website</label><v-text-field solo></v-text-field>
      </Col>
      <Col width={2/5} xs={1}>
        <label>Title</label><v-text-field solo></v-text-field>
      </Col>
      <Col>
        <label>About</label><v-textarea solo></v-textarea>
      </Col>
    </Row>
  </Col>
</Row>
```
## Demo 2: 响应式带沟槽(列间距)的卡片列表
![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-list.png?raw=true)
```html
<Row>
  <Col xl={1/5} lg={1/4} md={1/3} sm={1/2} xs={1}><Card1 /></Col>
  <Col xl={1/5} lg={1/4} md={1/3} sm={1/2} xs={1}><Card1 /></Col>
  <Col xl={1/5} lg={1/4} md={1/3} sm={1/2} xs={1}><Card1 /></Col>
  ...
</Row>
```

## 相关
* [我的博客](https://phphe.com)
* [vue-colrow](https://vue-colrow.phphe.com/zh) vue版本
* [响应式](https://vue-colrow.phphe.com/zh/guide.html#响应式)
* [CSS hack](https://vue-colrow.phphe.com/zh/guide.html#css-hack)

## License
[MIT](http://opensource.org/licenses/MIT)