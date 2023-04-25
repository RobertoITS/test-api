import { Component, ElementRef, ViewChild } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { ApiTeachersService } from 'src/app/services/api.teachers.service';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent {
  @ViewChild('date') date!: ElementRef<HTMLInputElement>
  @ViewChild('professor') professor!: ElementRef<HTMLInputElement>
  @ViewChild('materia') materia!: ElementRef<HTMLInputElement>
  @ViewChild('schedule') schedule!: ElementRef<HTMLInputElement>
  data = ''
  width = 0
  constructor(private apiAttendance: ApiTeachersService) {}

  postOne() {
    const object: Attendance = {
      attendance_date: this.date.nativeElement.value,
      professor_id: +this.professor.nativeElement.value,
      materia_id: +this.materia.nativeElement.value,
      schedule_id: +this.schedule.nativeElement.value
    }
    this.apiAttendance.postAttendance(object).subscribe({
      next: data => {
        console.log(data)
        const today = new Date()
        const yyyy = today.getFullYear()
        let mm = (today.getMonth() + 1).toString()
        let dd = today.getDate().toString()
        if(dd.length < 2) dd = '0' + dd
        if(mm.length < 2) mm = '0' + mm
        const formattedDate = `${dd}/${mm}/${yyyy}`
        this.data = `{"attendance_id":${data.id},"professor_id":2,"materia_id":1,"schedule_id":21}`
        this.width = 256
      },
      error: e => { console.log(e) }
    })
  }
}
