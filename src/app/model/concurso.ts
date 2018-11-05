import { Jogo } from "src/app/model/jogo";
import { Bilhete } from "src/app/model/bilhete";
import { Ganhador } from "./Ganhador";

export class Concurso {
    id: number;

    jogo: Jogo;
    bilhetes: Array<Bilhete>;
    ganhadores: Array<Ganhador>;
    ValorPremio: number;

    constructor(){
        this.bilhetes = new Array();
    }
}

