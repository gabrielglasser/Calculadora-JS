class CalcController {
  constructor() {
    this._lastOperator = "";
    this._lastNumber = "";
    this.operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this.initialize();
    this.initButtonsEvents();
    this._currentDateç;
  }

  initialize() {
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);

    this.setDisplayDateTime();
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  //LIMPAR TUDO
  clearAll() {
    this._operation = [];
    this.setLastNumberToDisplay();
  }

  //CANCELAR A ENTRADA
  cancelEntry() {
    this._operation.pop();
    this.setLastNumberToDisplay();
  }

  //TROCAR O OPERADOR
  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  pushOperatation(value) {
    this._operation.push(value);

    if (this._operation.length > 3) {
      this.calc();
    }
  }

  getResult() {
    return eval(this._operation.join(""));
  }

  calc() {
    let last = "";

    this._lastNumber = this.getLastItem();

    if (this._operation.length < 3){ 
      let firstItem = this._operation[0];
      this._operation = [firstItem, this._lastOperator, this._lastNumber
      ];
    }

    if (this._operation.length > 3) {
      last = this._operation.pop();

      this._lastNumber = this.getResult();
    } else if (this._operation.length == 3){
      this._lastOperator = this.getLastItem(false);
    }

    let result = this.getResult();

    if (last == "%") {
      result /= 100;

      this._operation = [result];
    } else {
      this._operation = [result];

      if (last) this._operation.push(last);
    }

    this.setLastNumberToDisplay();
  }

  //ULTIMO PARAMETRO
  getLastItem(isOperator = true) {
    let lastItem;

    for (let i = this._operation.length - 1; i >= 0; i--) {
        if (this.isOperator(this._operation[i]) == isOperator) {
          lastItem = this._operation[i];
          break;
        }
    }

    if(!lastItem){
      lastItem = (isOperator) ? this._lastOperator : this.lastNumber;
    }
    return lastItem;
  }

  //MOSTRAR O ULTIMO NUMERO NO DISPLAY DA CALCULADORA
  setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false)

    if (!lastNumber) lastNumber = 0;

    this.displayCalc = lastNumber;
  }

  //ADICIONAR OPERACAO NO ARRAY
  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        //trocar o operador
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        //outra opcao
      } else {
        this.pushOperatation(value);

        this.setLastNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperatation(value);
      } else {
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseInt(newValue));

        //atualizar o display

        this.setLastNumberToDisplay();
      }
    }
  }

  //MENSAGEM DE ERRO
  setError() {
    this.displayCalc = "Error";
  }

  //PEGAR A ULTIMA OPERACAO DO ARRAY
  getLastOperation() {
    return this._operation[this._operation.length - 1];
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
        this.addOperation("+");
        break;
      case "subtracao":
        this.addOperation("-");
        break;
      case "multiplicacao":
        this.addOperation("*");
        break;
      case "divisao":
        this.addOperation("/");
        break;
      case "porcento":
        this.addOperation("%");
        break;
      case "igual":
        this.calc();
        break;
      case "ponto":
        this.addOperation(".");
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        this.setLastNumberToDisplay();
        break;

      default:
        TouchList.setError();
        break;
    }
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        let textBtn = btn.className.baseVal.replace("btn-", "");

        this.execBtn(textBtn);
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  }

  setDisplayDateTime() {
    console.log("atualizando a hora");
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    return (this._timeEl.innerHTML = value);
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    return (this._dateEl.innerHTML = value);
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
