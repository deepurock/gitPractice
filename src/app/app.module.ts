import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
} from "@angular/material";
import { MatFormFieldModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConverterComponent } from "./converter/converter.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { ParentComponent } from "./parent/parent.component";
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    UserFormComponent,
    ParentComponent,
    ChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
