import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MascotasService } from 'src/app/core/services/datos/mascotas.service';
import { TiposService } from 'src/app/core/services/datos/tipos.service';
import { UsuariosService } from 'src/app/core/services/datos/usuarios.service';
import { MascotasComponent } from 'src/app/features/menu-layout/mascotas/mascotas.component';

@Component({
  selector: 'app-dialog-mascotas',
  templateUrl: './dialog-mascotas.component.html',
  styleUrl: './dialog-mascotas.component.scss',
})
export class DialogMascotasComponent {
  @Input() checkNew: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() status!: any;

  myForm!: FormGroup;
  myFormEdit!: FormGroup;
  myFormNew!: FormGroup;

  usuarios: any[] = [];
  tipos: any[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(DIALOG_DATA)
    public data: {
      isEditable: boolean;
      status: any;
      checkNew: boolean;
    },
    private dialogRef: MatDialogRef<DialogMascotasComponent>,
    private mascotasService: MascotasService,
    private usuariosService: UsuariosService,
    private tiposService: TiposService
  ) {
    this.isEditable = data.isEditable;
    this.status = data.status;
    this.checkNew = data.checkNew;

    this.myFormEdit = fb.group({
      id_usuario: [this.status.id_usuario, Validators.required],
      id_tipo: [this.status.id_tipo, Validators.required],
      nombre_mascota: [this.status.nombre_mascota, Validators.required],
      fecha_nac_mascota: [this.status.fecha_nac_mascota, Validators.required],
      nChip_mascota: [this.status.nChip_mascota, Validators.required],
      raza_mascota: [this.status.raza_mascota, Validators.required],
    });

    this.myFormNew = fb.group({
      id_usuario: ['', Validators.required],
      id_tipo: ['', Validators.required],
      nombre_mascota: ['', Validators.required],
      fecha_nac_mascota: ['', Validators.required],
      nChip_mascota: ['', Validators.required],
      raza_mascota: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.usuariosService.getAllUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.results.filter(
          (usuario: any) => usuario.id_rol === 1
        );
      },
      error: (err) => console.error(err),
    });

    this.tiposService.getTiposMascota().subscribe({
      next: (data) => {
        this.tipos = data.results;
      },
      error: (err) => console.error(err),
    });
  }

  newStatus() {
    if (this.myFormNew.valid) {
      const newStatus: any = this.myFormNew.value;

      this.mascotasService
        .addMascota(newStatus, sessionStorage['authToken'])
        .subscribe({
          next: (data) => {
            this.dialogRef.close(newStatus);
          },
          error: (err) => console.error(err),
        });
    }
  }

  /* Método para devolver el formulario correcto según el formName */
  getForm(formName: string): FormGroup {
    if (formName === 'myFormNew') {
      return this.myFormNew;
    } else if (formName === 'myFormEdit') {
      return this.myFormEdit;
    }
    throw new Error(`Formulario no encontrado: ${formName}`);
  }

  /* Esta función se ejecuta cada vez que un select cambia su valor */
  onSelectChange(formName: string): void {
    const form = this.getForm(formName);
    form.updateValueAndValidity(); // Actualiza la validez y recalcula la visibilidad
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
