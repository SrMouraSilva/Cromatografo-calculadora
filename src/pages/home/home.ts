import { ViewChild, Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { TempoComponent } from '../../components/tempo/tempo';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('tempoDeAnalise') tempoDeAnalise: TempoComponent;

  public calculoTerminoQuantidade = "0";
  @ViewChild('calculoTerminoTempoInicial') calculoTerminoTempoInicial: TempoComponent;
  @ViewChild('calculoTerminoTempoFinal') calculoTerminoTempoFinal: TempoComponent;

  public calculoQuantidadeQuantidade = "0";
  @ViewChild('calculoQuantidadeTempoInicial') calculoQuantidadeTempoInicial: TempoComponent;
  @ViewChild('calculoQuantidadeTempoFinal') calculoQuantidadeTempoFinal: TempoComponent;

  public quantidade: {inicio : Date, quantidade: number, termino : Date };

  constructor(public navCtrl: NavController) {}

  ionViewWillEnter() {
    this.inicializarCalculoTermino();
    this.inicializarCalculoQuantidade();
  }

  inicializarCalculoTermino() {
    this.tempoDeAnalise.valor = this.seteMinutos();

    const inicio = DataUtils.buildData();
    inicio.setSeconds(0);
    inicio.setMilliseconds(0);

    this.calculoTerminoTempoInicial.valor = inicio;

    const fim = DataUtils.buildData();
    fim.setSeconds(0);
    fim.setMilliseconds(0);

    this.calculoTerminoTempoFinal.valor = fim;

    this.calculoTerminoQuantidade = "0";
  }

  inicializarCalculoQuantidade() {
    const inicio = DataUtils.buildData();
    inicio.setSeconds(0);
    inicio.setMilliseconds(0);

    this.calculoQuantidadeTempoInicial.valor = inicio;

    const termino = DataUtils.buildData();
    termino.setSeconds(0);
    termino.setMilliseconds(0);

    this.calculoQuantidadeTempoFinal.valor = termino;
    this.calculoQuantidadeQuantidade = "0";
  }

  private seteMinutos() {
    let tempo = DataUtils.tempoZero();
    tempo.setMinutes(7);

    return tempo;
  }

  atualizar() {
    this.atualizarTermino();
    this.atualizarQuantidade();
  }

  atualizarTermino() {
    let tempoInicio = this.calculoTerminoTempoInicial.valor.getTime();
    let quantidade = parseInt(this.calculoTerminoQuantidade);

    let tempoFim = tempoInicio + quantidade * this.tempoDeAnalise.totalEmMilissegundos;

    this.calculoTerminoTempoFinal.valor = new Date(tempoFim);
  }

  atualizarQuantidade() {
    let tempoInicio = this.calculoQuantidadeTempoInicial.valor.getTime();
    let tempoTermino = this.calculoQuantidadeTempoFinal.valor.getTime();
    if (tempoTermino < tempoInicio)
      tempoTermino += 24 * 60 * 60 * 1000;

    this.calculoQuantidadeQuantidade = "" + Math.trunc((tempoTermino - tempoInicio) / this.tempoDeAnalise.totalEmMilissegundos);
  }
}

class DataUtils {
  static tempoZero() {
    let data = DataUtils.buildData();
    let timeZone = data.getUTCHours() - data.getHours();

    data.setHours(-timeZone);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);

    return data;
  }

  static buildData(tempo?) {
    let data = tempo ? new Date(tempo) : new Date();
    let timeZone = DataUtils.timeZone(data);

    data.setHours(data.getHours() - timeZone);

    return data;
  }

  static timeZone(data) {
    return data.getUTCHours() - data.getHours();
  }
}
