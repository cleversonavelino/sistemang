export class Cliente {

    constructor(key: string = null, nome: string = null, dataNascimento: any = null) {
        this.key = key;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    }

    key: string;
    nome: string;
    dataNascimento:any;

}