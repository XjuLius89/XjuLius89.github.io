import { AgGridModule } from 'ag-grid-angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyCalendarComponent } from './duty-calendar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DutyCalendarComponent', () => {
  let component: DutyCalendarComponent;
  let fixture: ComponentFixture<DutyCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AgGridModule,
      ],
      declarations: [DutyCalendarComponent]
    });
    fixture = TestBed.createComponent(DutyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
