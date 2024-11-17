import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-aviso-legal',
  templateUrl: './dialog-aviso-legal.component.html',
  styleUrl: './dialog-aviso-legal.component.scss',
})
export class DialogAvisoLegalComponent {
  constructor(private dialogRef: MatDialogRef<DialogAvisoLegalComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
