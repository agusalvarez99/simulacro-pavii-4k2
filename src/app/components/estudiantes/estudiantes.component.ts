import { Component, OnInit } from '@angular/core';
import { Estudiantes } from '../../models/estudiantes';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  titulo: string = 'Estudiantes';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC: string = 'L';
  Items: Estudiantes[] = [];
  submitted = false;

  constructor() {}

  ngOnInit() {}
}
