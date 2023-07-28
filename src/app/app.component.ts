import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'joffroy-web-app';
  constructor(private toastr: ToastrService) {}
  mostrarToast(): void {
    this.toastr.success('Mensaje de éxito', 'Título del toast');
  }
}
