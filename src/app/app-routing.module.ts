import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConverterComponent } from "./converter/converter.component";
import { UserFormComponent } from "./user-form/user-form.component";

const routes: Routes = [
  { path: "converter", component: ConverterComponent },
  { path: "userForm", component: UserFormComponent },
  { path: "**", component: ConverterComponent },
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
