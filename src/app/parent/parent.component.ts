import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  firstName: string;
  lastName: string;
  constructor(fname: string, lname: string) {
    this.firstName = fname;
    this.lastName = lname;
    this.myfun();
  }
  myfun() {
    console.log("deep");
  }
  ngOnInit() {}
}
