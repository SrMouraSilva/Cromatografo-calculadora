import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private base : number;
  tempo: string;
  termino: any;
  quantidade: any;

  constructor(public navCtrl: NavController) {
    this.base = this.tempoZero().getTime();
    this.tempo = this.seteMinutos().toISOString();

    this.termino = {
      inicio: this.buildData().toISOString(),
      quantidade: 0,
      termino: this.buildData().toISOString()
    };

    this.quantidade = {
      inicio: this.buildData().toISOString(),
      quantidade: 0,
      termino: this.buildData().toISOString()
    };
  }

  private tempoZero() {
    let data = this.buildData();
    let timeZone = data.getUTCHours() - data.getHours();

    data.setHours(-timeZone);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);

    return data;
  }

  private seteMinutos() {
    let tempo = this.tempoZero();
    tempo.setMinutes(7);

    return tempo;
  }

  atualizarTermino() {
    let tempoInicio = this.buildData(this.termino.inicio).getTime();
    let quantidade = this.termino.quantidade;

    let tempoFim = tempoInicio + quantidade * this.tempoAnalise();

    this.termino.termino = this.buildData(tempoFim).toISOString();
  }

  atualizarQuantidade() {
    let tempoInicio = this.buildData(this.quantidade.inicio).getTime();
    let tempoTermino = this.buildData(this.quantidade.termino).getTime();

    this.quantidade.quantidade = Math.trunc((tempoTermino - tempoInicio) / this.tempoAnalise());
  }

  tempoAnalise() {
    return new Date(this.tempo).getTime() - this.base;
  }

  buildData(tempo?) {
    let data = tempo ? new Date(tempo) : new Date();
    let timeZone = data.getUTCHours() - data.getHours();

    data.setHours(data.getHours() - timeZone);

    return data;
  }
}
