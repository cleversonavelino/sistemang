export class DashBoardModel {

    constructor(key: string = null, nome: string = null, descricao: any = null, foto: string = null) {
        this.key = key;
        this.nome = nome;  
        this.descricao = descricao;      
        this.foto = foto;
    }

    key: string;
    nome: string;
    descricao:string;
    foto: string;

}