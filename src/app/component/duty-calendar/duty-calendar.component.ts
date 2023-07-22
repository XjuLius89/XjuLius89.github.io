import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, ColumnApi, GridReadyEvent } from 'ag-grid-community';
import { LoggingService } from 'src/app/service/common/logger.service';
import { DayValidatorService } from 'src/app/service/day-validator.service';

import { RotateType } from 'src/models/rotate-type.constant';
import { DutyRowData } from 'src/models/row-data.interface';

@Component({
  selector: 'app-duty-calendar',
  templateUrl: './duty-calendar.component.html',
  styleUrls: ['./duty-calendar.component.scss']
})
export class DutyCalendarComponent implements OnInit {
  readonly className = `DutyCalendarComponent`;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'date', headerName: 'วันที่' },
    { field: 'd1351_doctor_name', headerName: '1351' },
    { field: 'd1351_rotate', headerName: 'หน่วย' },
    { field: 'd1352_1_doctor_name', headerName: '1352.1' },
    { field: 'd1352_1_rotate', headerName: 'หน่วย' },
    { field: 'd1352_2_doctor_name', headerName: '1352.2' },
    { field: 'd1352_2_rotate', headerName: 'หน่วย' },
    { field: 'r1_1_doctor_name', headerName: 'R1.1' },
    { field: 'r1_1_rotate', headerName: 'หน่วย' },
    { field: 'r1_2_doctor_name', headerName: 'R1.2' },
    { field: 'r1_2_rotate', headerName: 'หน่วย' },
    { field: 'r1_3_doctor_name', headerName: 'R1.3' },
    { field: 'r1_3_rotate', headerName: 'หน่วย' },
    { field: 'pool_morning_doctor_name', headerName: 'คอกก่อนเที่ยง' },
    { field: 'pool_morning_rotate', headerName: 'หน่วย' },
    { field: 'pool_afternoon_doctor_name', headerName: 'คอกหลังเที่ยง' },
    { field: 'pool_afternoon_rotate', headerName: 'หน่วย' },
    { field: 'pool_evening_doctor_name', headerName: 'คอกบ่าย' },
    { field: 'pool_evening_rotate', headerName: 'หน่วย' },
    { field: 'pool_night_doctor_name', headerName: 'คอกดึก' },
    { field: 'pool_night_rotate', headerName: 'หน่วย' },
    { field: 'pool_night_star_doctor_name', headerName: 'คอกดึกดาว' },
    { field: 'pool_night_start_rotate', headerName: 'หน่วย' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // Data that gets displayed in the grid
  public rowData = [
    {
      date: '1',
      d1351_doctor_name: 'ณภัทร',
      d1351_rotate: RotateType.ENT,
      d1352_1_doctor_name: 'วริษฐา',
      d1352_1_rotate: RotateType.Eye,
      d1352_2_doctor_name: 'เมธัส',
      d1352_2_rotate: RotateType.Gen,
      r1_1_doctor_name: 'จิรัชยา',
      r1_1_rotate: RotateType.XRay,
      r1_2_doctor_name: 'ชญานิษฐ์',
      r1_2_rotate: RotateType.Uro,
      r1_3_doctor_name: 'ปานจันทร์',
      r1_3_rotate: RotateType.SIPAC,
    },
    {
      date: '2',
      d1351_doctor_name: 'ณภัทร',
      d1351_rotate: RotateType.ENT,
      d1352_1_doctor_name: 'วริษฐา',
      d1352_1_rotate: RotateType.Eye,
      d1352_2_doctor_name: 'เมธัส',
      d1352_2_rotate: RotateType.Gen,
      r1_1_doctor_name: 'จิรัชยา',
      r1_1_rotate: RotateType.XRay,
      r1_2_doctor_name: 'ชญานิษฐ์',
      r1_2_rotate: RotateType.Uro,
      r1_3_doctor_name: 'ปานจันทร์',
      r1_3_rotate: RotateType.SIPAC,
      pool_morning_doctor_name: 'สิรภัทร',
      pool_morning_rotate: RotateType.Trauma,
    },
  ] as DutyRowData[];

  // For accessing the Grid's API
  @ViewChild("agGrid") agGrid!: AgGridAngular;
  private gridColumnApi!: ColumnApi;

  constructor(
    private dayValidatorService: DayValidatorService,
    private http: HttpClient,
    private logger: LoggingService,
  ) {

  }

  ngOnInit(): void {
  }

  // Load data from github - duty rotate data
  onGridReady(params: GridReadyEvent) {
    this.logger.info(`onGridReady`, this);
    this.sizeToFit();
    this.gridColumnApi = params.columnApi;
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  sizeToFit() {
    this.agGrid.api.sizeColumnsToFit();
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

}
