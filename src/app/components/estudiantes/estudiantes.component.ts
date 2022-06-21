import { Component, OnInit } from '@angular/core';
import { Barrios } from '../../models/barrios';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiantes } from '../../models/estudiantes';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  FormRegistro = new FormGroup({
    EstudianteID: new FormControl(0),
    EstudianteAyN: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    EstudianteLegajo: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,5}'),
    ]),
    EstudianteFechaNac: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
    EstudianteRegular: new FormControl(null, [Validators.required]),
    BarrioID: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.Buscar();
  }
  Buscar() {
    this.AccionABMC = 'L';
    this.estudiantesService.get().subscribe((res: Estudiantes[]) => {
      this.Items = res;
    });
  }
  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ IdEstudiante: 0 });
  }
}
