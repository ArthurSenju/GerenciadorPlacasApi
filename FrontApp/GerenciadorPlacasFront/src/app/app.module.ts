import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlacasModule } from './Components/placas/placas.module'; // Ajuste o caminho conforme necessário
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PlacasModule, // Certifique-se de que o módulo está sendo importado
    BrowserModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialog,
    MatButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true
    })
  ],
  providers: [provideHttpClient(withFetch()), provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
