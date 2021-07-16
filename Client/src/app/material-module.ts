import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

/** ALL THE MODULES FROM ANGULAR MATERIAL SHOULD BE DECLARED HERE 
 *  TO NOT CLUTTER app.module.ts
 */
@NgModule({
    exports: [
        MatDialogModule,
        MatDatepickerModule,
        MatCardModule,
        MatNativeDateModule 
        
    ]
})
export class MaterialModule { }

