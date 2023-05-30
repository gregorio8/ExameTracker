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
  medicos: { nome: string; horarios: string[] }[] = [];
  horarios: string[] = [];
  selectedMedico: any;
  selectedHorario: any;

  listRef: any;
  list: Observable<any>;
  especialidades = [
    {
      nome: 'Cardiologia',
      medicos: [
        {
          nome: 'Dr Cláudio',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dra Ana',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Pedro',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Sérgio',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
      ],
    },
    {
      nome: 'Endocrinologia',
      medicos: [
        {
          nome: 'Dr Marcelo',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dra Monique',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Lucas',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Sérgio',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
      ],
    },
    {
      nome: 'Ginecologia',
      medicos: [
        {
          nome: 'Dr Rubens',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dra Ana',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dra Luiza',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Robson',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
      ],
    },
    {
      nome: 'Neurologia',
      medicos: [
        {
          nome: 'Dra Sabrina',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dra Ana',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Ezequiel',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dra Suzy',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
      ],
    },
    {
      nome: 'Nutrição',
      medicos: [
        {
          nome: 'Dr Cláudio',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dra Ana',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Pedro',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        {
          nome: 'Dr Sérgio',
          horarios: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
      ],
    },
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
    const especialidadeSelecionada = this.especialidades.find(
      (esp) => esp.nome === this.especialidade
    );

    if (especialidadeSelecionada) {
      const medicoEncontrado = especialidadeSelecionada.medicos.find(
        (medico) => medico.nome === this.selectedMedico
      );

      if (medicoEncontrado) {
        const horarioIndex = medicoEncontrado.horarios.indexOf(
          this.selectedHorario
        );

        if (horarioIndex !== -1) {
          medicoEncontrado.horarios.splice(horarioIndex, 1);
        }
      }
    }
  }

  adicionarHorarioSelecionado(
    especialidade: string,
    medico: string,
    horario: string
  ) {
    if (especialidade && medico && horario) {
      const especialidadeSelecionada = this.especialidades.find(
        (esp) => esp.nome === especialidade
      );

      if (especialidadeSelecionada) {
        const medicoSelecionado = especialidadeSelecionada.medicos.find(
          (med) => med.nome === medico
        );

        if (medicoSelecionado) {
          if (!medicoSelecionado.horarios.includes(horario)) {
            medicoSelecionado.horarios.push(horario);
          }
        }
      }
    }
  }

  agendar() {
    if (this.selectedHorario) {
      const especialidadeSelecionada = this.especialidades.find(
        (esp) => esp.nome === this.especialidade
      );

      if (especialidadeSelecionada) {
        const medicoEncontrado = especialidadeSelecionada.medicos.find(
          (medico) => medico.nome === this.selectedMedico
        );

        if (medicoEncontrado) {
          const horarioIndex = medicoEncontrado.horarios.indexOf(
            this.selectedHorario
          );

          if (horarioIndex !== -1) {
            medicoEncontrado.horarios.splice(horarioIndex, 1);

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
              .catch((error: any) => {
                console.error('Erro ao agendar consulta:', error);
              });
          }
        }
      }
    }
  }

  onChangeEspecialidade(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.especialidade = target.value;
    const especialidadeSelecionada = this.especialidades.find(
      (esp) => esp.nome === this.especialidade
    );
    this.medicos = especialidadeSelecionada?.medicos || [];
    this.selectedMedico = '';
  }
  getHorariosMedico(medico: any) {
    const especialidadeSelecionada = this.especialidades.find(
      (esp) => esp.nome === this.especialidade
    );

    if (especialidadeSelecionada) {
      const medicoEncontrado = especialidadeSelecionada.medicos.find(
        (m) => m.nome === medico
      );

      if (medicoEncontrado) {
        return medicoEncontrado.horarios;
      }
    }

    return [];
  }
  /*   getMedicoNome(medico: any): string | undefined {
    const especialidadeSelecionada = this.especialidades.find(
      (esp) => esp.nome === this.especialidade
    );
    const medicoSelecionado = especialidadeSelecionada?.medicos.find(
      (m) => m.nome === medico.nome
    );
    return medicoSelecionado?.nome;
  } */

  getMedicosEspecialidade() {
    const especialidadeSelecionada = this.especialidades.find(
      (esp) => esp.nome === this.especialidade
    );
    return especialidadeSelecionada?.medicos || [];
  }
  RemoverExame(key: string) {
    this.listRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<any>[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((exames: any[]) => {
        const exame = exames.find((item: any) => item.key === key);

        if (exame) {
          const { especialidade, selectedMedico, selectedHorario } = exame;

          this.listRef
            .remove(key)
            .then(() => {
              console.log('Exame removido com sucesso!');
              this.adicionarHorarioSelecionado(
                especialidade,
                selectedMedico,
                selectedHorario
              );
            })
            .catch((error: any) => {
              console.error('Erro ao remover exame:', error);
            });
        }
      });
  }
}
