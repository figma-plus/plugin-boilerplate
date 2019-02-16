<h1 align="center"> Figma Plugin Boilerplate </h1>

<p align="center"> Kickstart your awesome Figma plugin with this boilerplate. </p>

<hr/>

<p align="center"> 
<img align="center" src="https://user-images.githubusercontent.com/1207863/52892896-07677c00-31a8-11e9-9ffb-f8d2849014d6.gif" />
 </p>

<h3> Features </h3>

<ul>
  <li>Modern Javascript (ES6)</li>
  <li>Tests using Jest</li>
  <li>Transpiling using Babel and bundle using Rollup</li>
  <li>Code formatting with Prettier</li>
</ul>

<h3> Code Demo </h3>

```js
export default class ExamplePlugin {
  constructor() {
    this.options = [
      "Alert File Name",
      this.main.bind(this),
      null,
      { shift: true, option: true, key: "t" }
    ];

    const { figmaPlugin } = window;
    figmaPlus.createPluginsMenuItem(...this.options);

    window.examplePlugin = this;
  }

  main() {
    const { App, alert } = window;
    const fileName = App.getCurrentFileName();

    alert(fileName);
  }
}

```

<h3> Download & Development </h3>


```shell
$ git clone https://github.com/figma-plus/plugin-boilerplate
```


```shell
$ yarn install
```


```shell
$ yarn serve
```


```shell
$ yarn test
```

<h4> Build a Distribution Bundle </h4>

```shell
$ yarn build
```

You'll see your bundle inside `dist` directory.
Follow the <a href="https://docs.figmaplus.com/#/developerGuide/publish">docs instructions</a> to publish it.

<h3>License</h3>

This project is licensed under the MIT License
