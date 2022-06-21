import { Component, OnInit } from '@angular/core';
import { Barrios } from '../../models/barrios';
import { EstudiantesService } from '../../services/estudiantes.service';
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
  Barrios: Barrios[] = [];
  submitted = false;

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit() {
    this.Buscar();
  }
  Buscar() {
    this.AccionABMC = 'L';
    this.estudiantesService.get().subscribe((res: Estudiantes[]) => {
      this.Items = res;
    });
  }
}
