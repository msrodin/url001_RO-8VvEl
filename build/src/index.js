System.register(['rodin/core', './container/mainContainer.js'], function (_export, _context) {
  "use strict";

  var RODIN, MainContainer;
  return {
    setters: [function (_rodinCore) {
      RODIN = _rodinCore;
    }, function (_containerMainContainerJs) {
      MainContainer = _containerMainContainerJs.MainContainer;
    }],
    execute: function () {
      RODIN.start();

      /**
       * MainContainer class draws and renders everything
       * @type {MainContainer}
       */
      let mainContainer = new MainContainer();
      mainContainer.run();
    }
  };
});