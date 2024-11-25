import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cookies',
  templateUrl: './dialog-cookies.component.html',
  styleUrl: './dialog-cookies.component.scss',
})
export class DialogCookiesComponent {
  constructor(private dialogRef: MatDialogRef<DialogCookiesComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
