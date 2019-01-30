import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatDividerModule,
  MatInputModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ]
})
export class MaterialModule {}
