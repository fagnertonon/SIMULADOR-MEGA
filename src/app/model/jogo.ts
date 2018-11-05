import { Bilhete } from "./bilhete";
import { Ganhador } from "src/app/model/Ganhador";

export abstract class Jogo {
    id: number;
    nome: string;
    sorteado: boolean;
    data: Date;
    numerosSorteio: Array<number>;
    qtdNumSortear: number;
    min: number;
    max: number;

    constructor(qtdNumSortear: number, min: number, max: number) {
        this.qtdNumSortear = qtdNumSortear;
        this.min = min;
        this.max = max;
    }

    Sorteado() {
        return this.sorteado ? 'Sorteado' : 'Aguardando Sorteio'
    }

    abstract Ganhadores(bilhete: Array<Bilhete>, valorPremio: number): Array<Ganhador>;
}

export class MegaSena extends Jogo {

    constructor() {
        super(6, 1, 60);
        this.nome = 'Mega Sena';
    }

    Ganhadores(bilhetes: Array<Bilhete>, valorPremio: number): Ganhador[] {

        let ganhadores: Array<Ganhador>;
        ganhadores = new Array();
        bilhetes.forEach(bilhete => {
            let numAcerto = 0
            let ganhador: Ganhador;
            ganhador = new Ganhador();
            for (let i = 0; i < this.numerosSorteio.length; i++) {
                const numeroMega = this.numerosSorteio[i];

                bilhete.numerosSorteio.forEach(numero => {
                    numAcerto += numero === numeroMega ? 1 : 0;
                });
            }

            switch (numAcerto) {
                case 6:
                    bilhete.resultado = 'Acertou a Sena'
                    ganhador.bilhete = bilhete;
                    ganhador.valor = 1000;
                    ganhador.descricao = `Ganhador da Sena - Bilhete: ${bilhete.id}`;
                    ganhadores.push(ganhador);
                    break;
                case 5:
                    bilhete.resultado = 'Acertou a Quina'
                    ganhador.bilhete = bilhete;
                    ganhador.valor = 500;
                    ganhador.descricao = `Ganhador da Quina - Bilhete: ${bilhete.id}`;
                    ganhadores.push(ganhador);
                    break;
                case 4:
                    bilhete.resultado = 'Acertou a Quadra'
                    ganhador.bilhete = bilhete;
                    ganhador.valor = 250;
                    ganhador.descricao = `Ganhador da Quadra - Bilhete: ${bilhete.id}`;
                    ganhadores.push(ganhador);
                    break;
                default:
                    break;
            }
        });

        return ganhadores;
    }
}