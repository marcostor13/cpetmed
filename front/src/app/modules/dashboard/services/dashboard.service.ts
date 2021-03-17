import { Injectable } from '@angular/core';
import { IDataApi } from 'src/app/models/dataapi';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../auth/services/auth.service';
import { IEvent } from '../../landings/models/event';
import { GeneralService } from '@services/general.service';
import { IURL } from '../../urls/models/url';
import { cloneDeep } from 'lodash-es';
import { Charts, DataSet } from './../models/charts';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  colors: string[] = ['#0245a3', '#8fbaf3', '#565D68', '#fd3a69', '#f2fcfc', '#0245a3', '#8fbaf3', '#565D68', '#fd3a69', '#f2fcfc', '#0245a3', '#8fbaf3', '#565D68', '#fd3a69', '#f2fcfc', '#0245a3', '#8fbaf3', '#565D68', '#fd3a69', '#f2fcfc'] 

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private general: GeneralService
  ) { }

  getData(){
    const data: IDataApi = {
      service: `get-data-dashboard/${this.authService.getUserID()}`,
      type: 'get',
      data: null
    }    
    return this.api.api(data)
  }

  getTypesEvents(events: IEvent[]){
    let response = []
    events.map((event:IEvent)=>{
      response = [...response, event.type ]
    })
    return [... new Set(response)]
  }

  getTypesURLs(urls: IURL[]) {
    let response = []
    urls.map((url: IURL) => {
      response = [...response, url.typeURL]
    })
    return [... new Set(response)]
  }

  getFiledByField(data: any[], source_id: string, sourceField: string, retunField: string){
    let dataArray = cloneDeep(data)
    dataArray = [...dataArray.filter(dat => dat[sourceField] === source_id)]
    return (dataArray.length > 0) ? dataArray[0][retunField] : null
  }


  formatCharts(chartData: any){
    let newChartData: Charts = new Charts
    let newDataSet: DataSet = new DataSet
    newChartData.labels = Object.keys(chartData)
    Object.keys(chartData).map( (key)=> { 
      newDataSet.data = [...newDataSet.data, chartData[key]]   
      newDataSet.backgroundColor = this.colors
      newDataSet.hoverBackgroundColor = this.colors   
      newDataSet.label = key
    })    
    newChartData.datasets = [...newChartData.datasets, newDataSet]
    return newChartData
  }

  getFieldByID(data: any, id: string, field: string) {
    let res = ''
    data.map((d => {
      if (d._id === id) {
        res = d[field]
      }
    }))
    return res
  }

  exportExcel(data: any, name: string) {
    
    import("xlsx").then(xlsx => {

      let worksheets = {}
      let names = []

      data.map((d: any) => {
        let newWS:any = {}
        newWS[d.name] = xlsx.utils.json_to_sheet(d.data)
        worksheets = { ...worksheets, ...newWS}
        names = [...names, d.name]   
      })
      const workbook = { Sheets: worksheets, SheetNames: names };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, name);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


  changeNamesHeaderExcel(data: any, fields: any){
    let newData = []

    data.map(d => {
      let newArray = {}
      Object.keys(fields).map((key) => {
        newArray[fields[key]] = d[key]
      })
      newData = [...newData, newArray]
    })
    this.general.c('new data', newData)  
    return newData
  }
  

}
