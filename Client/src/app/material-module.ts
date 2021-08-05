import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';

/** ALL THE MODULES FROM ANGULAR MATERIAL SHOULD BE DECLARED HERE 
 *  TO NOT CLUTTER app.module.ts
 */
@NgModule({
    exports: [
        MatDialogModule,
        MatDatepickerModule,
        MatCardModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatChipsModule
    ]
})
export class MaterialModule { }

