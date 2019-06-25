import { NgModule } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { DashBoardModel } from './dashboard.model';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',     
})

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [DashBoard]
})

export class DashBoard implements OnInit {

    items: any[];
    url:string;

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

    ngOnInit(): void {        
        this.listar();
    }

    listar() {        
        this.getAll().subscribe(
            items => this.items = items,
            error => alert(error),
            () => console.log("terminou")
          );        
    }

    getAll() : Observable<any[]> {
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