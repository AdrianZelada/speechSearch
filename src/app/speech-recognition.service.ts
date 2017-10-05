import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    webkitSpeechGrammarList: any;
    SpeechGrammarList: any;
    SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
    speechRecognition: any;
    speechGrammarList: any;

    constructor(private zone: NgZone) {
    }

    record(): Observable<string> {

      let phrases = [
          'i love to sing because it\'s fun',
  'where are you going',
  'can I call you tomorrow',
  'why did you talk while I was talking',
  'she enjoys reading books and playing games',
  'where are you going',
  'have a great day',
  'she sells seashells on the seashore'
      ];

      // let phrase = phrases.join(' | ');
      let phrase = phrases[Math.floor(Math.random() * phrases.length)];
      console.log(phrase);
      let grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';

        return Observable.create(observer => {
          console.log('observe')
            const { webkitSpeechRecognition,webkitSpeechGrammarList }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();

            this.speechGrammarList=new webkitSpeechGrammarList();
            this.speechGrammarList.addFromString(grammar,1);
            this.speechRecognition.grammars=this.speechGrammarList;
            this.speechRecognition.continuous = true;
            //this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = 'en-us';
            this.speechRecognition.maxAlternatives = 1;

            this.speechRecognition.onresult = speech => {
                let term: string = "";
                if (speech.results) {
                    var result = speech.results[speech.resultIndex];
                    var transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {
                            console.log("Unrecognized result - Please try again");
                        }
                        else {
                            term = _.trim(transcript);
                            console.log("Did you said? -> " + term + " , If not then say something else...");
                        }
                    }
                }
                this.zone.run(() => {
                    observer.next(term);
                });
            };

            this.speechRecognition.onerror = error => {
                observer.error(error);
            };

            this.speechRecognition.onend = () => {
                observer.complete();
            };

            this.speechRecognition.start();
            console.log("Say something - We are listening !!!");
        });
    }

    DestroySpeechObject() {
        if (this.speechRecognition)
            this.speechRecognition.stop();
    }

}
