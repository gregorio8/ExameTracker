import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private showCadastroSubject = new BehaviorSubject<boolean>(false);
  showCadastro$ = this.showCadastroSubject.asObservable();

  setShowCadastro(value: boolean) {
    this.showCadastroSubject.next(value);
  }
}
