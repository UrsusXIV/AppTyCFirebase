import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Variables para almacenar datos compartidos
  private idSeleccionado: number | null = null;
  private idCompetenciaSeleccionada: number | null = null;
  private nombreSeleccionado: string | null = null;
  private nombreCompetenciaSeleccionada: string | null = null;
  private updateMode: boolean | null = null;
  private emailSeleccionado: string | null = null;
  private idUsuario: number | null =  null;

  constructor() { }

  getIdUsuario(): number | null {
    return this.idUsuario;
  }

  setIdUsuario(idUs: number): void{
    this.idUsuario = idUs;
  }
  // Métodos para manejar la variable idSeleccionado
  getIdSeleccionado(): number | null {
    return this.idSeleccionado;
  }

  setIdSeleccionado(id: number): void {
    this.idSeleccionado = id;
  }

  // Métodos para manejar la variable idCompetenciaSeleccionada
  getIdCompetenciaSeleccionada(): number | null {
    return this.idCompetenciaSeleccionada;
  }

  setIdCompetenciaSeleccionada(idCom: number): void {
    this.idCompetenciaSeleccionada = idCom;
  }
  
  // Métodos para manejar la variable nombreSeleccionado
  getNombreSeleccionado(): string | null {
    return this.nombreSeleccionado;
  }

  setNombreSeleccionado(nombre: string): void {
    this.nombreSeleccionado = nombre;
  }

  // Metodos para manejar la variable nombreCompetenciaSeleccionada

  getNombreCompetenciaSeleccionada(): string | null {
    return this.nombreCompetenciaSeleccionada;
  }

  setNombreCompetenciaSeleccionada(nombreCom: string): void {
    this.nombreCompetenciaSeleccionada = nombreCom
  }

  // Métodos para manejar la variable updateMode
  setUpdateModeEnabled(isEnabled: boolean): void {
    this.updateMode = isEnabled;
  }

  getUpdateModeEnabled(): boolean | null {
    return this.updateMode;
  }

  // Métodos para manejar la variable emailSeleccionado
  setEmailSeleccionado(email: string): void {
    this.emailSeleccionado = email;
  }

  getEmailSeleccionado(): string | null {
    return this.emailSeleccionado;
  }
}
