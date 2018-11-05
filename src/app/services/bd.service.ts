import { Injectable } from '@angular/core';
import { Concurso } from '../model/concurso';
import { Bilhete } from '../model/bilhete';
import { MegaSena, Jogo } from 'src/app/model/jogo';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  Concursos: Array<Concurso>;

  constructor() {
    this.Concursos = new Array();
  }

  // cria um novo objeto bilhete e add a lista de bilhetes
  Jogar(bilhete: Bilhete, concurso: Concurso) {

    if (!concurso) {
      alert('Nenhum concurso selecionado.');
      return;
    }
    if (concurso.jogo.sorteado) {
      alert('esse concurso já foi sorteado.');
      return
    }

    if (bilhete.numerosSorteio.length === concurso.jogo.qtdNumSortear) {

      let id = concurso.bilhetes.length + 1;
      bilhete.id = id;
      bilhete.data = new Date();
      concurso.bilhetes.push(bilhete);

      return;
    }

    alert(`Para este jogo deve-se escolher ${concurso.jogo.qtdNumSortear} números.`);
  }

  //gera um bilhete com os numeros aleatorios
  JogarAutomatico(concurso: Concurso) {
    let numeros = new Array;
    let bilhete: Bilhete;
    bilhete = new Bilhete();

    bilhete.numerosSorteio = this.GerarNumeros(concurso.jogo);

    this.Jogar(bilhete, concurso);

  }

  CarregaConcursos() {
    return this.Concursos;
  }

  NovoConcurso() {
    let concurso = new Concurso();

    let jogo = new MegaSena()
    concurso.jogo = jogo;

    let id = this.Concursos.length + 1;
    concurso.id = id;

    this.Concursos.push(concurso);
    return this.Concursos;
  }

  AtualizaConcurso(concurso: Concurso) {
    let indexConcurso = this.Concursos.indexOf(concurso);
    this.Concursos.splice(indexConcurso, 1);

    this.Concursos.push(concurso);
  }

  GerarNumeros(jogo: Jogo) {

    let numeros: Array<number>;
    numeros = new Array;
    for (let i = 0; i < jogo.qtdNumSortear; i++) {

      let numero = Math.floor((Math.random() * jogo.max) + jogo.min);
      let existe = numeros.indexOf(numero);

      if (existe > -1) {
        i--;
      }
      else {
        numeros.push(numero);
      }

    }

    return numeros;
  }

  Ganhadores(concurso: Concurso) {

    if (!concurso.jogo.sorteado) return;

    concurso.ganhadores = concurso.jogo.Ganhadores(concurso.bilhetes, concurso.ValorPremio);

    return concurso.ganhadores;
  }

}
