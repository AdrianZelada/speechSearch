import { Component, OnInit, OnDestroy} from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  constructor(private speechRecognitionService: SpeechRecognitionService) {

  }

  ngOnInit() {
    console.log("hello")
  }

}
