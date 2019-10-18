import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  formulario: FormGroup;

  profesional: Array<string>;

  constructor(private http: HttpClient, public formBuilder: FormBuilder, private router: Router) {}

  ngOnInit () {

    this.profesional = [
      "Psicólogo",
      "Nutricionista",
      "Enfermera",
      "Kinesiólogo"
    ];

    this.formulario = this.formBuilder.group({

      profesional: new FormControl (this.profesional[0]),
      nombre: new FormControl (''),
      apellido: new FormControl (''),
      rut: new FormControl (''),
      observacion: new FormControl('')
    });

  }

    postData(){
      const value = this.formulario.value;
      var url= 'http://localhost:3000/databases.json';
      this.http.post(url, {
        profesional: value.profesional,
        nombre: value.nombre,
        apellido: value.apellido,
        rut: value.rut,
        observacion: value.observacion,
      })
      .subscribe((response) => {
      console.log(response);
      });
    };

  }



