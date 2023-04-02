import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Career } from '../models/career.model';

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


  careers: any[] = []

  constructor(private api: ApiService){}

  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.api.getCareer().subscribe(data => {
      this.careers = data.result
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

  changeValues(object: any) {
    this.id = object.id.toString()
    this.name = object.name
    this.description = object.description
    this.duration = object.duration
  }
}
