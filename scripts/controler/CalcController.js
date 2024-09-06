class CalcController {
  constructor() {
    this.operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this.initialize();
    this.initButtonsEvents();
  };

  initialize() {
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  };

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  };

  //LIMPAR TUDO
  clearAll() {
    this._operation = [];
  };

  //CANCELAR A ENTRADA
  cancelEntry() {
    this._operation.pop();
  };

//ADICIONAR OPERACAO NO ARRAY
  addOperation(value) {
    this._operation.push(value);
  };

  //MENSAGEM DE ERRO
  setError() {
    this.displayCalc = "Error";
  }

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.cancelEntry();
        break;
      case "soma":
        this.cancelEntry();
        break;
      case "subtracao":
        this.cancelEntry();
        break;
      case "multiplicacao":
        this.cancelEntry();
        break;
      case "divisao":
        this.cancelEntry();
        break;
      case "porcento":
        this.cancelEntry();
        break;
      case "igual":
        this.cancelEntry();
        break;

      default:
        TouchList.setError();
        break;
    }
  };

  initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        let textBtn = btn.className.baseVal.replace("btn-", "");

        this.execBtn();
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  };

  setDisplayDateTime() {
    console.log("atualizando a hora");
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  };

  get displayTime() {
    return this._timeEl.innerHTML;
  };

  set displayTime(value) {
    return (this._timeEl.innerHTML = value);
  };

  get displayDate() {
    return this._dateEl.innerHTML;
  };

  set displayDate(value) {
    return (this._dateEl.innerHTML = value);
  };

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  };

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  };

  get currentDate() {
    return new Date();
  };

  set currentDate(value) {
    this._currentDate = value;
  };
};
