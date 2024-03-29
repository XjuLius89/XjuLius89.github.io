import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, ColumnApi, GridReadyEvent } from 'ag-grid-community';
import { LoggingService } from 'src/app/service/common/logger.service';
import { DayValidatorService } from 'src/app/service/day-validator.service';
import { RotateUtilsService } from 'src/app/service/rotate-utils.service';
import { RotateList } from 'src/models/rotate-data.interface';
import { DoctorAssignerService } from './../../service/doctor-assigner.service';

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
    { field: 'dateNumber', headerName: 'วันที่' },
    { field: 'dateName', headerName: 'วัน' },
    { field: 'd1351_doctor_name', headerName: '1351' },
    { field: 'd1351_rotate', headerName: 'หน่วย' },
    { field: 'd1352_1_doctor_name', headerName: '1352.1' },
    { field: 'd1352_1_rotate', headerName: 'หน่วย' },
    { field: 'd1352_2_doctor_name', headerName: '1352.2' },
    { field: 'd1352_2_rotate', headerName: 'หน่วย' },
    { field: 'sDuty_r1_1_doctor_name', headerName: 'R1.1' },
    { field: 'sDuty_r1_1_rotate', headerName: 'หน่วย' },
    { field: 'sDuty_r1_2_doctor_name', headerName: 'R1.2' },
    { field: 'sDuty_r1_2_rotate', headerName: 'หน่วย' },
    { field: 'sDuty_r1_3_doctor_name', headerName: 'R1.3' },
    { field: 'sDuty_r1_3_rotate', headerName: 'หน่วย' },
    { field: 'pMorning_doctor_name', headerName: 'คอกก่อนเที่ยง' },
    { field: 'pMorning_rotate', headerName: 'หน่วย' },
    { field: 'pAfternoon_doctor_name', headerName: 'คอกหลังเที่ยง' },
    { field: 'pAfternoon_rotate', headerName: 'หน่วย' },
    { field: 'pEvening_doctor_name', headerName: 'คอกบ่าย' },
    { field: 'pEvening_rotate', headerName: 'หน่วย' },
    { field: 'pNight_doctor_name', headerName: 'คอกดึก' },
    { field: 'pNight_rotate', headerName: 'หน่วย' },
    { field: 'pNight_star_doctor_name', headerName: 'คอกดึกดาว' },
    { field: 'pNight_start_rotate', headerName: 'หน่วย' },
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
      dateNumber: 1,
      dateName: 'Tue',
      d1351_doctor_name: 'ณภัทร',
      d1351_rotate: RotateType.ENT,
      d1352_1_doctor_name: 'วริษฐา',
      d1352_1_rotate: RotateType.Eye,
      d1352_2_doctor_name: 'เมธัส',
      d1352_2_rotate: RotateType.GEN,
      sDuty_r1_1_doctor_name: 'จิรัชยา',
      sDuty_r1_1_rotate: RotateType.XRay,
      sDuty_r1_2_doctor_name: 'ชญานิษฐ์',
      sDuty_r1_2_rotate: RotateType.Uro,
      sDuty_r1_3_doctor_name: 'ปานจันทร์',
      sDuty_r1_3_rotate: RotateType.SIPAC,
    }
  ] as DutyRowData[];

  // For accessing the Grid's API
  @ViewChild("agGrid") agGrid!: AgGridAngular;
  private gridColumnApi!: ColumnApi;
  public rotateJsonData!: RotateList;
  public month!: string;
  public year!: string;

  constructor(
    private dayValidatorService: DayValidatorService,
    private doctorAssignerService: DoctorAssignerService,
    private rotateUtilsService: RotateUtilsService,
    private http: HttpClient,
    private logger: LoggingService,
  ) {

  }

  ngOnInit(): void {
    this.readJsonData();
  }

  shuffle(): void {
    this.readJsonData();
  };

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

  autoSizeAll(skipHeader: boolean): void {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  download(): void {
    this.agGrid.api.exportDataAsCsv();
  }

  readJsonData(): void {
    this.http.get<RotateList>('../assets/docs/doctor-rotate.json').subscribe((res) => {
      // confirm read rotate json data.
      this.rotateJsonData = res;
      this.logger.info(`jsonData = ${JSON.stringify(this.rotateJsonData)}`, this);

      // set month / year
      this.month = this.rotateJsonData.month;
      this.year = this.rotateJsonData.year;

      const workDay = this.rotateUtilsService.parse(this.rotateJsonData);
      // this.logger.info(`jsonData = ${JSON.stringify(workDay, null, 2)}`, this);

      const rowData = this.rotateUtilsService.transfromWorkDayToRowData(workDay);
      // this.logger.info(`rowData = ${JSON.stringify(rowData, null, 2)}`, this);

      this.agGrid.api.setRowData(rowData);

      this.doctorAssignerService.report();
    });
  }
}
