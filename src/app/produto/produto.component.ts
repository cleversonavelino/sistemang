import { NgModule } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { Produto } from './produto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
    selector: 'produto',
    templateUrl: './produto.component.html',
    providers: [AngularFireStorage]
})

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ProdutoComponent]
})

export class ProdutoComponent implements OnInit {

    produto: Produto;    
    produtos: any[];
    url: string;

    selectedFiles: FileList;

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

    ngOnInit(): void {
        this.produto = new Produto();
        this.listar();
    }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
        this.storage.upload(this.selectedFiles[0].name, this.selectedFiles[0]);
        var url = this.storage.ref(this.selectedFiles[0].name).getDownloadURL().subscribe(url => {
            this.url = url;
         });
    }

    salvar() {
        this.produto.foto = this.url;

        this.db.list('produtos').push(this.produto)
            .then((result: any) => {
                console.log(result.key);
                this.url = '';
            });

    }

    listar() {
        this.getAll().subscribe(
            produtos => this.produtos = produtos,
            error => alert(error),
            () => console.log("terminou")
        );
    }

    getAll(): Observable<any[]> {
        return this.db.list('produtos')
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => (
                        { key: c.payload.key, ...c.payload.val() }));
                })
            );
    }


}