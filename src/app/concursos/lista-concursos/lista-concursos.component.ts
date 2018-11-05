import { Component, OnInit } from '@angular/core';
import { Concurso } from '../../model/concurso';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-lista-concursos',
  templateUrl: './lista-concursos.component.html',
  styleUrls: ['./lista-concursos.component.css']
})
export class ListaConcursosComponent implements OnInit {

  private concurso: Concurso;
  private concursos: Array<Concurso>;
  private concursoAtual: Concurso;


  constructor(private bdServices: BdService) {
    this.concursos = new Array;
  }
  ngOnInit() {
    this.concursos = this.bdServices.CarregaConcursos();
  }
  // Sorteio seis numeros e verifica na lista de bilhetes do concurso se existe algum vencedor
  GeraSorteio() {

    if (this.concursoAtual == null) {
      alert("Primeiro selecione um concurso!");
      return;
    }

    if (this.concursoAtual.jogo.sorteado) {
      alert("Concurso já foi sorteado.");
      return;
    }

    this.concursoAtual.jogo.numerosSorteio = this.bdServices.GerarNumeros(this.concursoAtual.jogo);
    this.concursoAtual.jogo.sorteado = true;

    this.concursoAtual.ganhadores = this.bdServices.Ganhadores(this.concursoAtual);

    this.bdServices.AtualizaConcurso(this.concursoAtual);
  }

  NovoConcurso() {
    this.concursos = this.bdServices.NovoConcurso();
  }
}
