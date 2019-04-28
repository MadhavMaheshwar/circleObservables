import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { BusinessService } from '../app/business.service';

import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';


import { Runtime, Inspector } from "@observablehq/notebook-runtime";
import chart from "../assets/graph";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  title = 'DevExercise';
  version;
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private bs: BusinessService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    // this.bs
    //   .getVersion()
    //   .subscribe((data) => {
    //     this.version = data;
    //     console.log(this.version)
    // });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  file;
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      //  this.form.get('avatar').setValue(file);
      console.log("onFileChange called");
    }
  }
  // onSubmit() {
  //    const formData = new FormData();
  //     formData.append('file', this.file);
  //      }
  uploadDocument() {
    console.log("uploadDocument called");
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      console.log(this.csvJSON(fileReader.result));
  }
    fileReader.readAsText(this.file);
  }

  @ViewChild('directedGraph') directedGraph: ElementRef;
ngAfterContentInit() {
Runtime.load(chart, Inspector.into(this.directedGraph.nativeElement));
}





public csvJSON(csv) {
  var lines = csv.split("\r");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}
}
