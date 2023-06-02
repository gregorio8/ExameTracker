import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

export interface Item {
  key: string;
  email: string;
  name: string;
  age: number;
}

export interface Exames {
  especialidade?: string;
  exame: string;
  medico: string;
  data: number;
  horario: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  hide: boolean = false;
  examTable: boolean = false;
  email = '' as string;
  password = '' as string;

  formNewName = '' as string;
  formNewAge = '' as string;

  listRef: any;
  list: Observable<Item[]>;

  constructor(
    public auth: AuthService,
    private database: AngularFireDatabase,
    private router: Router
  ) {
    this.listRef = database.list('list');
    this.list = this.listRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<Item>[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  ngOnInit() {}

  addItem() {
    this.listRef.push({
      name: this.formNewName,
      age: this.formNewAge,
      email: this.auth.user.email,
    });
    this.formNewName = '';
    this.formNewAge = '';
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }

  goToConsult() {
    this.hide = true;
    this.router.navigate(['/exames'], { queryParams: { mostrarFormulario: 'true' } });
  }

  backHome() {
    this.hide = false;
    this.examTable = false;
    this.router.navigate(['/']);
  }

  showTable() {
    this.hide = true;
    this.examTable = true;
    this.router.navigate(['/exames']);
  }
}
