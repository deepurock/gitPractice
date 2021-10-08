import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";

@Component({
  selector: "app-converter",
  templateUrl: "./converter.component.html",
  styleUrls: ["./converter.component.css"],
})
export class ConverterComponent implements OnInit {
  constructor(private _ngZone: NgZone, private router: Router) {}
  showTemp = true;
  ngOnInit() {}
  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  navigateToConverter() {
    this.router.navigateByUrl("userForm");
  }
}
