import {Input, Output, Component, EventEmitter } from '@angular/core';


@Component({
  selector: 'tempo',
  templateUrl: 'tempo.html'
})
export class TempoComponent {
  @Input() exibirSegundos : boolean = false;
  @Input() disabled : boolean = false;
  @Output() change = new EventEmitter();

  valor : Date;

  constructor() {
    this.valor = new Date();
  }

  set model(value) {
    let string = value.split(':');

    let horas = parseInt(string[0]);
    let minutos = parseInt(string[1]);
    let segundos = string[2] == undefined ? 0 : parseInt(string[2]);

    this.valor.setHours(horas - this.timeZone);
    this.valor.setMinutes(minutos);
    this.valor.setSeconds(segundos);

    this.change.emit(this.valor)
  }

  get model() {
    return this.valor.toISOString().substring(11, 19);
  }

  get horas() : number {
    return this.valor.getHours() + this.timeZone;
  }

  get minutos() : number {
    return this.valor.getMinutes()
  }

  get segundos() : number {
    return this.valor.getSeconds()
  }

  get totalEmMilissegundos() {
    return this.horas * 60 * 60 * 1000 + this.minutos * 60 * 1000 + this.segundos * 1000;
  }

  private get timeZone() {
    return this.valor.getUTCHours() - this.valor.getHours();
  }

  get step() {
    return this.exibirSegundos ? 1 : 0;
  }
}
