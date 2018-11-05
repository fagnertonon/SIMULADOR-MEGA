export class Bilhete {
    id: number;
    data: Date;
    numerosSorteio: Array<number>;
    resultado: string;
    concursoId: number;
    constructor() {
        this.numerosSorteio =  new Array();
    }
}