import { NgModule, SkipSelf, Optional } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSidenavModule,
  MatSelectModule,
  MatFormFieldModule,
  MatIconRegistry,
  MatDatepickerModule,
  MatChipsModule,
  MatTabsModule,
  MatSliderModule,
  MatProgressBarModule
} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './/app-routing.module';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
// menu
import { FormsModule } from "@angular/forms";
import { FloatingActionMenuModule } from 'ng2-floating-action-menu';

//boot
import { AlertModule } from 'ng2-bootstrap';
import { OrderServesService } from './shared/order-serves.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FinishStateComponent } from './finish-state/finish-state.component';
import { PollComponent } from './poll/poll.component';
import { areaListComponent } from './area-list/area-list.component';
import { orderStateComponent } from './order-state/order-state.component';
import { BarCartComponent } from './bar-cart/bar-cart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TimeListComponent } from './time-list/time-list.component';
import { EchartsModule } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import * as $ from 'jquery';
import { WeekLineComponent } from './week-line/week-line.component';
import { DiacreteBarComponent } from './diacrete-bar/diacrete-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    BarCartComponent,
    areaListComponent,
    orderStateComponent,
    LineChartComponent,
    FinishStateComponent,
    PollComponent,
    TimeListComponent,
    WeekLineComponent,
    DiacreteBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule,
    AppRoutingModule,
    NvD3Module,
    FormsModule,
    FloatingActionMenuModule,
    AlertModule.forRoot(),
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,   
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTabsModule,
    MatRadioModule,
    MatSliderModule,
    MatProgressBarModule,
    ChartsModule,
    // EchartsModule,
    NgxEchartsModule
  ],
 exports:[
  MatProgressBarModule
 ],
  providers: [
    OrderServesService,
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
