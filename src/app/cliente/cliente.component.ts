import { NgModule } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { Cliente } from './cliente.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
    selector: 'cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css'],
    providers: [AngularFireStorage]
})

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ClienteComponent]
})

export class ClienteComponent implements OnInit {

    cliente: Cliente;
    clientesRef: AngularFireList<any>;
    clientes: any[];
    url:string;

    selectedFiles: FileList;

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

    ngOnInit(): void {
        this.cliente = new Cliente();
        this.listar();
    }

    detectFiles(event) {
        this.selectedFiles = event.target.files;        
    }

    salvar() {
        if (this.cliente.key == null) {
            this.storage.upload(this.selectedFiles[0].name,this.selectedFiles[0]);

            this.cliente.foto = this.selectedFiles[0].name;

            this.db.list('clientes').push(this.cliente)
                .then((result: any) => {
                    console.log(result.key);
                });            
        } else {
            this.db.list('clientes').update(this.cliente.key,this.cliente)
            .then((result: any) => {
                console.log(result.key);
            });  
        }
    }

    carregar(cliente:Cliente) {
        this.cliente = new Cliente(cliente.key,
            cliente.nome, cliente.dataNascimento, cliente.foto);

        var url = this.storage.ref(cliente.foto).getDownloadURL().subscribe(url => {
            this.url = url;
         });
    }

    excluir(key:string) {
        if (confirm('Deseja realmente excluir?')) {
            this.db.list('clientes').remove(key)
                .then((result: any) => {
                    console.log(key);
                });  
        }
    }

    listar() {        
        this.getAll().subscribe(
            clientes => this.clientes = clientes,
            error => alert(error),
            () => console.log("terminou")
          );        
    }

    getAll() : Observable<any[]> {
        return this.db.list('clientes')
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => (
                  { key: c.payload.key, ...c.payload.val() }));
            })
          );
      }


}