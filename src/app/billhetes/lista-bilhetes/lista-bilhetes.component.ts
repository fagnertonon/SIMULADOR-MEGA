import { Component, OnInit } from '@angular/core';
import { Bilhete } from '../../model/bilhete';
import { Concurso } from 'src/app/model/concurso';
import { BdService } from 'src/app/services/bd.service'
import { Tuple } from 'src/app/model/tuple';

@Component({
  selector: 'app-lista-bilhetes',
  templateUrl: './lista-bilhetes.component.html',
  styleUrls: []
})

export class ListaBilhetesComponent implements OnInit {

  private concursos: Array<Concurso>;
  private concursoAtual: Concurso;

  bilhete: Bilhete;
  numeros: Array<Tuple>;

  constructor(private bdServices: BdService) {
    this.concursos = new Array;
    this.bilhete = new Bilhete();

    this.concursos = this.bdServices.CarregaConcursos();

    this.InicializarJogo();
  }

  ngOnInit() {
  }

  InicializarJogo() {

    this.numeros = new Array();

    if (!this.concursoAtual) return;
    this.CarregaNumerosConcurso();
  }

  //marca o numero e adiciona numa array com o bilhete
  SelecionarNumero(numero) {
    if (this.numeros[numero - 1].bool) {
      let index = this.bilhete.numerosSorteio.indexOf(numero);
      this.bilhete.numerosSorteio.splice(index, 1)

      this.numeros[numero - 1].bool = !this.numeros[numero - 1].bool;
      return;
    }

    if (this.bilhete.numerosSorteio.length > this.concursoAtual.jogo.qtdNumSortear - 1 && !this.numeros[numero - 1].bool) {
      alert("não pode selecionar mais números.");
      return;
    }

    this.numeros[numero - 1].bool = !this.numeros[numero - 1].bool;
    this.bilhete.numerosSorteio.push(numero);
  }

  Jogar() {
    this.bdServices.Jogar(this.bilhete, this.concursoAtual);
  }

  JogarAutomatico() {
    this.bdServices.JogarAutomatico(this.concursoAtual);
  }

  NovoBilhete() {
    this.bilhete = new Bilhete();
    this.CarregaNumerosConcurso();
  }
  AtualizaConcursoAtual(concurso: any) {
    this.concursoAtual = concurso;

    this.CarregaNumerosConcurso();
  }
  CarregaNumerosConcurso() {
    this.numeros = new Array();
    for (let i = 1; i <= this.concursoAtual.jogo.max; i++) {
      let value = new Tuple();

      value.numero = i;
      value.bool = false;

      this.numeros.push(value)
    }
  }
}


