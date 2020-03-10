# react-colrow
[English](https://github.com/phphe/react-colrow/blob/master/README.md) | [中文](https://github.com/phphe/react-colrow/blob/master/README_zh.md)

Smarter layout components. Based on css flexbox. Support responsive design, Typescript, server side render. 5 KB gzipped.

更智能的布局组件. 基于css flexbox. 支持响应式布局, Typescript, 服务端渲染. 5 KB gzipped. 

Col's width can be fixed number, percentage or auto grow. Support responsive layout. Row has gutter to set column spacing. This libarary based on css flexbox, not js. So it support ssr(server side render).

I created [vue-colrow](https://vue-colrow.phphe.com) first. react-colrow is developed with Typescript, so I don’t want to write a repeat detailed document. If you want know more, you can refer to vue-colrow's documentation.

## Usage
```js
import {Row, Col, BreakRow, config} from 'react-colrow'
```
css is included in js. Row, Col and BreakRow are components, `config` is [global config](https://vue-colrow.phphe.com/api.html#config). 

## Demo
Follow screenshot images are from vue-colrow, but it also works with react-colrow.

![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form.png?raw=true)

In small screen: 

![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form-xs.png?raw=true)

The code should be:
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
## Demo 2: Responsive card list with gutter
![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-list.png?raw=true)
```html
<Row>
  <Col xl={1/5} lg={1/4} md={1/3} sm={1/2} xs={1}><Card1 /></Col>
  <Col xl={1/5} lg={1/4} md={1/3} sm={1/2} xs={1}><Card1 /></Col>
  <Col xl={1/5} lg={1/4} md={1/3} sm={1/2} xs={1}><Card1 /></Col>
  ...
</Row>
```

## Related
* [My blog](https://phphe.com)
* [vue-colrow](https://vue-colrow.phphe.com)
* [Responsive](https://vue-colrow.phphe.com/guide.html#responsive)
* [CSS hack](https://vue-colrow.phphe.com/guide.html#css-hack)

## License
[MIT](http://opensource.org/licenses/MIT)