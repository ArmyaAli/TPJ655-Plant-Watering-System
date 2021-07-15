import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';

/** ALL THE MODULES FROM ANGULAR MATERIAL SHOULD BE DECLARED HERE 
 *  TO NOT CLUTTER app.module.ts
 */
@NgModule({
    exports: [
        MatDialogModule
    ]
})
export class MaterialModule { }

