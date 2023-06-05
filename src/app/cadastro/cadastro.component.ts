import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  email: string = '';
  senha: string = '';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private cadastroService: CadastroService
  ) {}

  async register() {
    if (!this.isValidEmail(this.email)) {
      console.error('Email inválido');
      return;
    }

    try {
      const credencial = await this.auth.createUserWithEmailAndPassword(
        this.email,
        this.senha
      );
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
    this.cadastroService.setShowCadastro(false);
    this.router.navigate(['/']);
  }

  backToHome() {
    this.cadastroService.setShowCadastro(false);
    this.router.navigate(['/']);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
