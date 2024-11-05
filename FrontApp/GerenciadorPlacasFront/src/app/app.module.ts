import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlacasModule } from './Components/placas/placas.module'; // Ajuste o caminho conforme necessário

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PlacasModule, // Certifique-se de que o módulo está sendo importado
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
