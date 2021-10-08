import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { GetAllListService } from "./httpServices/get-all-list.service";
import { LocalStorageService } from "./storageService/local-storage.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { of } from "rxjs";
import { tap, map, finalize } from "rxjs/operators";
import { Router } from "@angular/router";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

interface Food {
  name: string;
  age: string;
  surname: string;
}
interface product {
  productName: string;
  cost: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  foods: Food[];
  model: any;
  price: any;
  firstName: any;
  lastName: any;
  age: any;

  products: product[];
  testObject: any = "";
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private listService: GetAllListService
  ) {
    this.testObject = { name: "test", time: "Date 2017-02-03T08:38:04.449Z" };
    this.localStorage.set("title", this.testObject);
  }

  userDetails() {
    this.listService.getUserDetails().subscribe((res) => {
      console.log("my response is ", res);
      this.foods = res;
    });
  }
  foo(event: any) {
    console.log("selected value is", event.value);
  }

  productDetails() {
    this.listService
      .getProductDetails()
      .pipe(
        tap((_) => {
          console.log("API successfull");
        }),
        finalize(() => {
          console.log("API successfull does not mattedadar");
        })
      )
      .subscribe((res) => {
        this.products = res;
      });
  }
  ngOnInit(): void {
    this.router.navigate(["/converter"]);
    this.userDetails();
    this.productDetails();
  }
  onRemove(id) {
    this.listService.deleteById(id).subscribe((res) => {
      console.log("response is", res);
      if (res.responseCode == 1) {
        this.listService.openSnackBar(res.resp, "OK");
        this.productDetails();
      }
    });
  }
  submitForm() {
    this.listService
      .addProductDetails(
        this.model,
        this.price,
        this.firstName,
        this.lastName,
        this.age
      )
      .subscribe((res) => {
        console.log(res);
        // if (res.responseCode == 1) {
        this.model = "";
        this.price = "";
        this.firstName = "";
        this.lastName = "";
        this.age = "";
        this.productDetails();
        this.userDetails();
        // }
      });
  }

  title = "MaterialProject";

  navigateToConverter() {
    this.router.navigateByUrl("converter");
  }
}
