import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { tap, map, finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GetAllListService {
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  getUserDetails(): Observable<any> {
    return this.httpClient.get("http://localhost:3200/").pipe(
      tap((_) => {
        console.log("API successfull");
      }),
      finalize(() => {
        console.log("API successfull does not matter");
      })
    );
  }
  getProductDetails(): Observable<any> {
    return this.httpClient.get("http://localhost:3200/productDetails");
  }
  deleteById(id: any): Observable<any> {
    return this.httpClient.delete(
      "http://localhost:3200" + "/deleteProduct?" + "ProductId=" + id
    );
  }
  // addProductDetails(
  //   productName: any,
  //   cost: any,
  //   firstName: any,
  //   lastName: any,
  //   age: any
  // ): Observable<any> {
  //   return this.httpClient.get(
  //     "http://localhost:3200" +
  //       "/products?" +
  //       "productName=" +
  //       productName +
  //       "&cost=" +
  //       cost +
  //       "&firstName=" +
  //       firstName +
  //       "&lastName=" +
  //       lastName +
  //       "&age=" +
  //       age
  //   );
  // }

  addProductDetails(
    productName: any,
    cost: any,
    firstName: any,
    lastName: any,
    age: any
  ): Observable<any> {
    const reqObj = {
      productName: productName,
      cost: cost,
      firstName: firstName,
      lastName: lastName,
      age: +age,
    };
    return this.httpClient.post("http://localhost:3200" + "/products", reqObj);
  }
}
