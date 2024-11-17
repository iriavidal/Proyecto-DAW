import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-privacidad',
  templateUrl: './dialog-privacidad.component.html',
  styleUrl: './dialog-privacidad.component.scss',
})
export class DialogPrivacidadComponent {
  constructor(private dialogRef: MatDialogRef<DialogPrivacidadComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
