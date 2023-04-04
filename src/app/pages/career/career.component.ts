import { Component, ElementRef, ViewChild } from '@angular/core';
import { Career } from '../../models/career.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiCareerService } from 'src/app/services/api.career.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
  //! New
  @ViewChild('nName') nName!: ElementRef<HTMLInputElement>
  @ViewChild('nDescription') nDescription!: ElementRef<HTMLInputElement>
  @ViewChild('nDuration') nDuration!: ElementRef<HTMLInputElement>
  @ViewChild('nClose') nClose!: ElementRef<HTMLButtonElement>

  //! Edit
  @ViewChild('eId') eId!: ElementRef<HTMLInputElement>
  @ViewChild('eName') eName!: ElementRef<HTMLInputElement>
  @ViewChild('eDescription') eDescription!: ElementRef<HTMLInputElement>
  @ViewChild('eDuration') eDuration!: ElementRef<HTMLInputElement>
  @ViewChild('eClose') eClose!: ElementRef<HTMLButtonElement>
  id: string = ''
  name: string = ''
  description: string =''
  duration: string = ''

  //! Search
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement>

  //* Data refresh
  subscription!: Subscription

  careers: any[] = []

  constructor(private api: ApiCareerService){}

  ngOnInit(){
    //* Obtenemos todos los datos
    this.getAll()

    //* Refrescamos la vista:
    this.subscription = this.api.refresh$.subscribe(() => {
      this.api.getCareer().subscribe((data) => {
        this.careers = data.result
      })
    })
  }

  getAll(){
    this.api.getCareer().subscribe(data => {
      this.careers = data.result
      console.log(data);

    })
  }

  postOne() {
    const object: Career = {
      id: '',
      name: this.nName.nativeElement.value,
      description: this.nDescription.nativeElement.value,
      duration: this.nDuration.nativeElement.value
    }
    this.api.postCareer(object).subscribe(data => {
      console.log(data);
      this.nClose.nativeElement.click()
      this.nName.nativeElement.value = ''
      this.nDescription.nativeElement.value = ''
      this.nDuration.nativeElement.value = ''
    })
  }

  putOne() {
    const career: Career = {
      id: this.eId.nativeElement.value,
      name: this.eName.nativeElement.value,
      description: this.eDescription.nativeElement.value,
      duration: this.eDuration.nativeElement.value
    }
    this.api.putCareer(this.id, career).subscribe(data => {
      console.log(data);
      this.eClose.nativeElement.click()
    })
  }
  deleteOne() {
    var answer = window.confirm('Delete record?')
    if (answer) {
      this.api.deleteCareer(this.id).subscribe(data => {
        console.log(data);
        this.eClose.nativeElement.click()
      })
    } else {
      this.eClose.nativeElement.click()
    }
  }
  getOneByParameters(){
    this.api.searchOneByParameters(this.searchI.nativeElement.value).subscribe((data) => {
      this.careers = data.result
    })
  }
  //* captura los cambios en el input
  onKey(value: string) {
    if(value == '' || value == null){
      this.getAll()
    }
  }

  changeValues(object: any) {
    this.id = object.id.toString()
    this.name = object.name
    this.description = object.description
    this.duration = object.duration
  }
}
