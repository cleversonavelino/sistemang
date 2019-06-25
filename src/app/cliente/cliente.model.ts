export class Cliente {

    constructor(key: string = null, nome: string = null, dataNascimento: any = null, foto: string = null) {
        this.key = key;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.foto = foto;
    }

    key: string;
    nome: string;
    dataNascimento:any;
    foto: string;

}