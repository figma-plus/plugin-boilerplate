export default class ExamplePlugin {
  constructor() {
    const { App } = window;

    this.fileName = App.getCurrentFileName();

    this.options = [
      "Alert File Name",
      this.main.bind(this),
      null,
      { shift: true, option: true, key: "t" }
    ];

    window.figmaPlugin.createPluginsMenuItem(...this.options);
  }

  main() {
    const { alert } = window;
    alert(this.fileName);
  }
}

window.examplePlugin = new ExamplePlugin();
