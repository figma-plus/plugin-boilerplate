export default class ExamplePlugin {
  constructor() {
    const { figmaPlus } = window;

    this.fileName = figmaPlus.fileName;

    this.options = {
      label: "Alert File Name",
      action: this.main,
      shortcut: {
        mac: {
          option: true,
          shift: true,
          key: "t"
        },
        windows: {
          alt: true,
          shift: true,
          key: "t"
        }
      }
    };

    window.figmaPlus.addCommand(this.options);
  }

  main = () => {
    const { alert } = window;
    alert(this.fileName);
  };
}

window.examplePlugin = new ExamplePlugin();
