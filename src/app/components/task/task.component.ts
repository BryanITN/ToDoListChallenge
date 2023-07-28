import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetStatusTaskResponse } from 'src/app/models/StatusTask';
import { CreateUpdateTask, GetTaskResponse } from 'src/app/models/Task';
import { StatusTaskService } from 'src/app/services/status-task.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  tasks: GetTaskResponse[] = [];
  idToEdit:number=0;

  statusTaskOptions: GetStatusTaskResponse[] = [
  ];

  editForm: FormGroup=new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    statusTaskId: new FormControl(Validators.required)
  });
  constructor(private taskService:TaskService,private route:Router,private toast:ToastrService,private statusTaskService:StatusTaskService) { }
  ngOnInit(): void {
  this.getTask();
  this.statusTaskService.GetStatusTask().subscribe(response=>{
    this.statusTaskOptions = response;
  },err=>{
    this.toast.error(err.error.Message,'Error', {timeOut: 1500});
  });
}
  displayEditDialog: boolean = false;
  objTask:CreateUpdateTask|null=null;
  editTask(task: GetTaskResponse) {
    this.objTask={...task};
    this.idToEdit=task.Id;
    this.editForm.patchValue({
      title: task.Title,
      description: task.Description,
      statusTaskId: task.StatusTaskId
    });
    this.displayEditDialog = true;
  }

  confirmDeleteTask(task: GetTaskResponse) {

  }
  onSubmit() {
    if (this.editForm.valid) {

      const statusTask=this.editForm.get('statusTaskId')?.value as GetStatusTaskResponse;

     if(this.isNew){
        this.objTask={
          CreatedDate: this.generateFormattedDate(),
          StatusTaskId: statusTask.Id,
          Title: this.editForm.get('title')?.value,
          Description:this.editForm.get('description')?.value,
          UserId: Number(localStorage.getItem('UserId'))
        };
        this.taskService.CreateTask(this.objTask).subscribe(data=>{
          this.toast.success("Tarea generada correctamente","Tarea");
          this.hideEditDialog();
          this.getTask();
        },err=>{
          this.toast.error(err.error.Message,"Error");
        });
     }
     else{
      this.objTask!.Title= this.editForm.get('title')?.value;
      this.objTask!.Description= this.editForm.get('description')?.value;
      this.objTask!.StatusTaskId= statusTask.Id;

      this.taskService.UpdateTask(this.objTask!,this.idToEdit).subscribe(data=>{
        this.toast.success("Tarea editada correctamente","Tarea");
        this.hideEditDialog();
        this.getTask();
      },err=>{
        this.toast.error(err.error.Message,"Error");
      });
     }

    }
  }
  isNew:boolean=false;
  showNewDialog() {
    this.displayEditDialog=true;
    this.isNew=true;
  }
  hideEditDialog() {
    this.displayEditDialog = false;
    this.isNew=false;
    this.editForm.reset();
  }
   generateFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().padStart(4, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  getTask(){
    const userId = Number(localStorage.getItem('UserId'));
    if(userId){
      this.taskService.GetAllTaskByUser(userId).subscribe(response=>{
        this.tasks = response;
      },err=>{
        this.toast.error(err.error.Message,'Error', {timeOut: 2500});
      });
  }
  }
}
