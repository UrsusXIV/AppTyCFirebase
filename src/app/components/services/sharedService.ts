import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private idSeleccionado: number | null = null;
  private nombreSeleccionado: string | null = null;
  private updateMode: boolean | null = null;
  private emailSeleccionado: string | null = null;

  constructor() { }

  getIdSeleccionado(): number | null {
    return this.idSeleccionado;
  }

  setIdSeleccionado(id: number): void {
    this.idSeleccionado = id;
  }
  
  getNombreSeleccionado(): string | null {
    return this.nombreSeleccionado;
  }

  setNombreSeleccionado(nombre: string): void {
    this.nombreSeleccionado = nombre;
  }

  setUpdateModeEnabled(isEnabled: boolean):void {
    this.updateMode = isEnabled;

  }

  getUpdateModeEnabled(): boolean | null {
    return this.updateMode;
  }

  setEmailSeleccionado(email: string): void {
    this.emailSeleccionado = email;
  }

  getEmailSeleccionado(): string | null {
    return this.emailSeleccionado;
  }

}
