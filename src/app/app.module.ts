import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { TaskService } from './services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StatusTaskService } from './services/status-task.service';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ToastNoAnimationModule, ToastrModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'task', component: TaskComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a '/login' por defecto
  { path: '**', component: LoginComponent }, // Ruta comodín para manejar rutas no encontradas
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [LoginService,TaskService,
    StatusTaskService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideToastr()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
