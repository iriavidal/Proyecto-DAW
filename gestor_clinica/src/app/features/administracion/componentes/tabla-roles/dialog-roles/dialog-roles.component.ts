import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RolesService } from 'src/app/core/services/datos/roles.service';

@Component({
  selector: 'app-dialog-roles',
  templateUrl: './dialog-roles.component.html',
  styleUrl: './dialog-roles.component.scss',
})
export class DialogRolesComponent {
  @Input() checkNew: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() status!: any;
  myForm!: FormGroup;
  myFormEdit!: FormGroup;
  myFormNew!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(DIALOG_DATA)
    public data: {
      isEditable: boolean;
      status: any;
      checkNew: boolean;
    },
    private dialogRef: MatDialogRef<DialogRolesComponent>,
    private rolesService: RolesService
  ) {
    this.isEditable = data.isEditable;
    this.status = data.status;
    this.checkNew = data.checkNew;

    this.myFormEdit = fb.group({
      rol: [this.status.rol, Validators.required],
    });

    this.myFormNew = fb.group({
      rol: ['', Validators.required],
    });
  }

  newStatus() {
    if (this.myFormNew.valid) {
      const newStatus: any = this.myFormNew.value;

      this.rolesService
        .postRol(newStatus, sessionStorage['authToken'])
        .subscribe({
          next: (data) => {
            this.dialogRef.close(newStatus);
          },
          error: (err) => console.error(err),
        });
    }
  }

  updateStatus() {
    if (this.myFormEdit.valid) {
      const updateStatus: any = this.myFormEdit.value;

      this.rolesService
        .updateRol(
          this.status.id_rol,
          sessionStorage['authToken'],
          updateStatus
        )
        .subscribe({
          next: (data) => {
            this.dialogRef.close(updateStatus);
          },
          error: (err) => console.error(err),
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
