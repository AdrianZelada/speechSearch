/**
 * Created by iZel on 10/5/17.
 */
import { Component,OnInit} from '@angular/core';
import { SpeechRecognitionService } from '../speech-recognition.service';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector:'search-speech',
  templateUrl:'./search-speech.component.html'
})

export class SearchSpeechComponent implements OnInit{

  showSearchButton: boolean;
  speechData: string;
  data:any;
  results:any=[];
  constructor(private speechRecognitionService: SpeechRecognitionService, private http:Http) {
    this.showSearchButton = false;
    this.speechData = "";
  }

  ngOnInit(){
    this.http.get('assets/data.json').map((data)=>{
      return data.json()
    }).subscribe((resp)=>{
      console.log(resp)
      this.data=resp;
    })
  }
  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  disabledSpeechSearch(){
    this.speechRecognitionService.DestroySpeechObject();
    this.showSearchButton = false;

  }

  activateSpeechSearch(): void {
    this.showSearchButton = true;

    this.speechRecognitionService.record()
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          this.results=[];
          this.results=this.data.filter((item)=>{
            return item.category==value;
          });
          this.disabledSpeechSearch();
        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            // this.showSearchButton = true;
            // this.activateSpeechSearch();
            this.disabledSpeechSearch();

          }
        },
        //completion
        () => {
          // this.showSearchButton = true;
          console.log("--complete--");
          this.disabledSpeechSearch();
          // this.activateSpeechSearch();
        });
  }

  search(){

  }

}
