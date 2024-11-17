import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPrivacidadComponent } from './componentes/dialog-privacidad/dialog-privacidad.component';
import { DialogAvisoLegalComponent } from './componentes/dialog-aviso-legal/dialog-aviso-legal.component';
import { DialogCookiesComponent } from './componentes/dialog-cookies/dialog-cookies.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private _dialog: MatDialog) {}

  dialogPrivacidad() {
    const dialogRef = this._dialog.open(DialogPrivacidadComponent);
  }

  dialogAvisoLegal() {
    const dialogRef = this._dialog.open(DialogAvisoLegalComponent);
  }

  dialogCookies() {
    const dialogRef = this._dialog.open(DialogCookiesComponent);
  }
}
