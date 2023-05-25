import { Component } from '@angular/core';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css'],
})
export class ExamesComponent {
  especialidade: string | undefined;
  medicos: string[] = [];
  selectedMedico: any;

  especialidades = [
    {
      nome: 'Cardiologia',
      medicos: ['Dr. João', 'Dra. Maria'],
    },
    {
      nome: 'Dermatologia',
      medicos: ['Dr. Pedro', 'Dra. Ana'],
    },
    // Adicione mais especialidades e médicos conforme necessário
  ];

  onChangeEspecialidade(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.especialidade = target.value;
    this.medicos =
      this.especialidades.find((e) => e.nome === this.especialidade)?.medicos ||
      [];
    this.selectedMedico = '';
  }

  getMedicosEspecialidade() {
    const especialidadeSelecionada = this.especialidades.find(
      (esp) => esp.nome === this.especialidade
    );
    return especialidadeSelecionada?.medicos || [];
  }
}
