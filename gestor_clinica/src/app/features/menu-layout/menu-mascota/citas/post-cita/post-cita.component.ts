import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-post-cita',
  templateUrl: './post-cita.component.html',
  styleUrl: './post-cita.component.scss',
})
export class PostCitaComponent {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});

  dia: string = '';
  hora: string = '';
  cita: string = '';

  selectedMascotaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {
    this.firstFormGroup = this.fb.group({
      fecha: ['', Validators.required], // Control para la fecha
    });

    this.secondFormGroup = this.fb.group({
      hora: ['', Validators.required], // Control para la hora
    });

    this.route.params.subscribe((params) => {
      if (params['id_mascota']) {
        this.selectedMascotaId = +params['id_mascota'];
      }
    });
  }

  fechaFiltro = (d: Date | null): boolean => {
    const today = new Date();
    const day = today.getDay();

    if (d) {
      const dayOfWeek = d.getDay();
      return d >= today && dayOfWeek !== 0 && dayOfWeek !== 6;
    }
    return false;
  };

  validarHora(horaSeleccionada: string) {
    const hora = horaSeleccionada.split(':');
    const horaNumerica = parseInt(hora[0], 10);

    if (
      (horaNumerica >= 10 && horaNumerica < 14) ||
      (horaNumerica >= 17 && horaNumerica < 20)
    ) {
      this.secondFormGroup.get('hora')?.setErrors(null);
    } else {
      this.secondFormGroup.get('hora')?.setErrors({ horaNoValida: true });
    }
  }

  obtenerCita(event: MatDatepickerInputEvent<Date>, input: string) {
    if (input == 'fecha') {
      const fechaOriginal = event.value;
      if (fechaOriginal) {
        const year = fechaOriginal.getFullYear();
        const month = ('0' + (fechaOriginal.getMonth() + 1)).slice(-2);
        const day = ('0' + fechaOriginal.getDate()).slice(-2);

        const fechaFormateada = `${year}-${month}-${day}`; // Formato YYYY-MM-DD
        this.dia = fechaFormateada;
      } else {
        console.error('No se pudo obtener la fecha.');
      }
    }

    if (input == 'hora') {
      this.hora = `${event}:00`;
    }

    this.cita = `${this.dia} ${this.hora}`;
  }

  atras() {
    this.router.navigate([`/menu/mascota/${this.selectedMascotaId}`]);
  }
}
