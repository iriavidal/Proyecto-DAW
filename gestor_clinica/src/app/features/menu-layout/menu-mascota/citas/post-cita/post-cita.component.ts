import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposCita } from 'src/app/core/enums/tipos-cita';
import { CitasService } from 'src/app/core/services/datos/citas.service';

@Component({
  selector: 'app-post-cita',
  templateUrl: './post-cita.component.html',
  styleUrl: './post-cita.component.scss',
})
export class PostCitaComponent {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});

  tiposCitaEnum = TiposCita;
  tiposCitaKeys: Array<keyof typeof TiposCita>;

  dia: string = '';
  hora: string = '';
  motivo: string = '';
  cita: string = '';

  data: {
    id_mascota: number;
    tipo_cita: string;
    fecha_y_hora: string;
  } = {
    id_mascota: 0,
    tipo_cita: '',
    fecha_y_hora: '',
  };

  selectedMascotaId: number = 0;
  selectedCitaId: number = 0;

  esEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private citasService: CitasService
  ) {
    this.firstFormGroup = this.fb.group({
      fecha: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      hora: ['', Validators.required],
    });

    this.tiposCitaKeys = Object.keys(TiposCita) as Array<
      keyof typeof TiposCita
    >;

    this.thirdFormGroup = this.fb.group({
      motivo: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.selectedMascotaId = +params['id_mascota'];

      if (params['id_cita']) {
        this.selectedCitaId = +params['id_cita'];
        this.esEdicion = true;
        this.cargarDatosCita();
      } else {
        this.selectedCitaId = 0;
        this.esEdicion = false;
      }
    });
  }

  cargarDatosCita(): void {
    this.citasService.getCita(this.selectedCitaId).subscribe({
      next: (data) => {
        this.data = data.results[0];

        const [fecha, hora] = this.data.fecha_y_hora.split(' ');

        this.firstFormGroup.patchValue({ fecha: new Date(fecha) });
        this.secondFormGroup.patchValue({ hora: hora });

        const motivoKey = Object.keys(this.tiposCitaEnum).find(
          (key) =>
            this.tiposCitaEnum[key as keyof typeof TiposCita] ===
            this.data.tipo_cita
        );

        if (motivoKey) {
          this.thirdFormGroup.patchValue({ motivo: motivoKey });
          this.motivo = this.tiposCitaEnum[motivoKey as keyof typeof TiposCita];
        } else {
          console.error(
            `El tipo_cita "${this.data.tipo_cita}" no coincide con los valores del enum.`
          );
        }

        this.dia = fecha;
        this.hora = hora;
      },
      error: (err) => {
        console.error('Error al cargar la cita:', err);
      },
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

  obtenerCita(
    event: MatDatepickerInputEvent<Date> | null,
    motivo: string | null,
    input: string
  ) {
    /* Capturar la fecha seleccionada */
    if (input == 'fecha') {
      const fechaOriginal = event?.value;
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

    /* Capturar la hora seleccionada */
    if (input == 'hora') {
      this.hora = `${event}:00`;
    }

    /* Juntar fecha y hora para el post */
    this.cita = `${this.dia} ${this.hora}`;

    /* Capturar el motivo de la consulta */
    if (input == 'motivo' && motivo != null) {
      const motivoKey = motivo as keyof typeof TiposCita;
      this.motivo = this.tiposCitaEnum[motivoKey];
    }
  }

  registrarCita() {
    /* Juntar todos los datos para el post */
    const data = {
      id_mascota: this.selectedMascotaId,
      tipo_cita: this.motivo,
      fecha_y_hora: this.cita,
    };

    this.citasService
      .postCitaMascota(data, sessionStorage['authToken'])
      .subscribe({
        next: (data) => {
          console.log('Registro exitoso:', data);
          this.atras();
        },
        error: (err) => {
          console.error('Error en el registro:', err);
        },
      });
  }

  editarCita(): void {
    const data = {
      id_mascota: this.selectedMascotaId,
      tipo_cita: this.motivo,
      fecha_y_hora: this.cita,
    };

    this.citasService
      .updateCita(this.selectedCitaId, sessionStorage['authToken'], data)
      .subscribe({
        next: (response) => {
          console.log('Cita actualizada:', response);
          this.atras();
        },
        error: (err) => {
          console.error('Error al actualizar la cita:', err);
        },
      });
  }

  atras() {
    this.router.navigate([`/menu/citas/${this.selectedMascotaId}`]);
  }
}
