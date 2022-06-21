import { Component, OnInit } from '@angular/core';
import { Barrios } from '../../models/barrios';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiantes } from '../../models/estudiantes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BarriosService } from '../../services/barrios.service';

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
  OpcionesRegular = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'Regular' },
    { Id: false, Nombre: 'No Regular' },
  ];
  constructor(
    private estudiantesService: EstudiantesService,
    private barriosServices: BarriosService
  ) {}

  FormRegistro = new FormGroup({
    EstudianteID: new FormControl(0),
    EstudianteAyN: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    EstudianteLegajo: new FormControl('', [
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
    this.GetBarrios();
    this.FormRegistro.reset({ IdEstudiante: 0, EstudianteRegular: 0 });
  }
  GetBarrios() {
    this.barriosServices.get().subscribe((res: Barrios[]) => {
      this.Barrios = res;
    });
  }
  Volver() {
    this.AccionABMC = 'L';
  }
  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }
    const itemCopy = { ...this.FormRegistro.value };
    var arrFecha = itemCopy.EstudianteFechaNac.substring(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.EstudianteFechaNac = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();
    this.estudiantesService.post(itemCopy).subscribe((res: any) => {
      this.Buscar();
    });
  }
}
