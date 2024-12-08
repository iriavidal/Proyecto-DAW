import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TiposService } from 'src/app/core/services/datos/tipos.service';

@Component({
  selector: 'app-dialog-tipos',
  templateUrl: './dialog-tipos.component.html',
  styleUrl: './dialog-tipos.component.scss',
})
export class DialogTiposComponent {
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
    private dialogRef: MatDialogRef<DialogTiposComponent>,
    private tiposService: TiposService
  ) {
    this.isEditable = data.isEditable;
    this.status = data.status;
    this.checkNew = data.checkNew;

    this.myFormEdit = fb.group({
      tipo: [this.status.tipo, Validators.required],
    });

    this.myFormNew = fb.group({
      tipo: ['', Validators.required],
    });
  }

  newStatus() {
    if (this.myFormNew.valid) {
      const newStatus: any = this.myFormNew.value;

      this.tiposService
        .postTipo(newStatus, sessionStorage['authToken'])
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

      this.tiposService
        .updateTipo(
          this.status.id_tipo,
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
