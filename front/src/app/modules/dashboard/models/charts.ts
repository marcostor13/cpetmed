export class Charts {
    labels: string[] = []
    datasets: DataSet[] = []    
}


export class DataSet {
    label: string = ''
    data: number[] = []
    backgroundColor: string[] = []
    hoverBackgroundColor: string[] = []
}