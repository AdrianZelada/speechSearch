import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SearchSpeechComponent} from './search-box/search-speech.component'


@NgModule({
  declarations: [
    AppComponent,
    SearchSpeechComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    SpeechRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
