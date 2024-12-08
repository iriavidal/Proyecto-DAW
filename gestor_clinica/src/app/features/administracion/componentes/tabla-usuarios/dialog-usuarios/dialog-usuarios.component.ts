import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { RolesService } from 'src/app/core/services/datos/roles.service';
import { dniValidator } from 'src/app/core/validators/dni.validator';

@Component({
  selector: 'app-dialog-usuarios',
  templateUrl: './dialog-usuarios.component.html',
  styleUrl: './dialog-usuarios.component.scss',
})
export class DialogUsuariosComponent {
  @Input() checkNew: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() status!: any;

  myForm!: FormGroup;
  myFormEdit!: FormGroup;
  myFormNew!: FormGroup;

  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(DIALOG_DATA)
    public data: {
      isEditable: boolean;
      status: any;
      checkNew: boolean;
    },
    private dialogRef: MatDialogRef<DialogUsuariosComponent>,
    private authService: AuthService,
    private rolesService: RolesService
  ) {
    this.isEditable = data.isEditable;
    this.status = data.status;
    this.checkNew = data.checkNew;

    this.myFormEdit = fb.group({
      nombre_usuario: [this.status.nombre_usuario, Validators.required],
      apellidos_usuario: [this.status.apellidos_usuario, Validators.required],
      email_usuario: [this.status.email_usuario, Validators.required],
      dni_usuario: [this.status.dni_usuario, Validators.required],
      direccion_usuario: [this.status.direccion_usuario],
    });

    this.myFormNew = fb.group({
      nombre_usuario: ['', Validators.required],
      apellidos_usuario: ['', Validators.required],
      email_usuario: ['', [Validators.required, Validators.email]],
      password_usuario: ['', [Validators.required]],
      dni_usuario: ['', [Validators.required, dniValidator()]],
      direccion_usuario: [''],
      id_rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data.results;
        console.log(this.roles);
      },
      error: (err) => console.error(err),
    });
  }

  newStatus() {
    if (this.myFormNew.valid) {
      const newStatus: any = this.myFormNew.value;
      console.log(newStatus);

      this.authService.register(newStatus).subscribe({
        next: (data) => {
          console.log(data);

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
