import { Component } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css'],
})
export class ExamesComponent {
  examTable: boolean = true;
  especialidade: string | undefined;
  medicos: string[] = [];
  selectedMedico: any;
  selectedHorario: any;

  listRef: any;
  list: Observable<any>;

  especialidades = [
    {
      nome: 'Cardiologia',
      medicos: ['Dr. João', 'Dra. Maria', 'Dr. Carlos', 'Dra. Ana'],
    },
    {
      nome: 'Dermatologia',
      medicos: ['Dr. Pedro', 'Dra. Sofia'],
    },
    {
      nome: 'Ginecologia',
      medicos: ['Dr. Roberto', 'Dra. Carolina', 'Dr. Lucas', 'Dra. Gabriela'],
    },
    {
      nome: 'Pediatria',
      medicos: ['Dr. Rafaela', 'Dra. Luiza', 'Dr. Tiago', 'Dra. Julia'],
    },
    {
      nome: 'Oftalmologia',
      medicos: ['Dr. Marcelo', 'Dra. Paula', 'Dr. André', 'Dra. Renata'],
    },
    {
      nome: 'Ortopedia',
      medicos: ['Dr. Ricardo', 'Dra. Fernanda', 'Dr. Eduardo', 'Dra. Beatriz'],
    },
    {
      nome: 'Psiquiatria',
      medicos: ['Dr. Antônio', 'Dra. Juliana', 'Dr. Carlos'],
    },
    {
      nome: 'Neurologia',
      medicos: ['Dr. Gustavo'],
    },
    {
      nome: 'Otorrinolaringologia',
      medicos: ['Dr. Felipe', 'Dra. Valentina', 'Dr. Gabriel', 'Dra. Larissa'],
    },
    {
      nome: 'Urologia',
      medicos: ['Dr. Marcos', 'Dra. Claudio', 'Dr. Ricardo', 'Dra. Patrick'],
    },
    // Adicione mais especialidades e médicos conforme necessário
  ];

  horarios: string[] = [
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  constructor(private database: AngularFireDatabase) {
    this.listRef = database.list('agenda');
    this.list = this.listRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<any>[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  removerHorarioSelecionado() {
    const index = this.horarios.indexOf(this.selectedHorario);
    if (index !== -1) {
      this.horarios.splice(index, 1);
      this.selectedHorario = '';
    }
  }

  adicionarHorarioSelecionado() {
    if (this.selectedHorario && !this.horarios.includes(this.selectedHorario)) {
      this.horarios.push(this.selectedHorario);
      this.selectedHorario = '';
    }
  }

  agendar() {
    if (this.selectedHorario && !this.horarios.includes(this.selectedHorario)) {
      this.horarios.push(this.selectedHorario);
    }

    this.listRef
      .push({
        especialidade: this.especialidade,
        selectedHorario: this.selectedHorario,
        selectedMedico: this.selectedMedico,
      })
      .then(() => {
        console.log('Consulta agendada com sucesso!');
        this.selectedHorario = '';
        this.selectedMedico = '';
        this.especialidade = undefined;
        this.removerHorarioSelecionado();
      })
      .catch((error: string) => {
        console.error('Erro ao agendar consulta:', error);
      });
  }

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

  RemoverExame(key: string) {
    this.adicionarHorarioSelecionado();
    this.listRef.remove(key);
  }
}
