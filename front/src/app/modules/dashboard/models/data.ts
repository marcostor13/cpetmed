import { IEvent } from './../../landings/models/event';
import { Landing } from './../../admin/landings/models/add-landing';
import { IList } from './../../urls/models/list';
import { IURL } from './../../urls/models/url';

export class DashboardData {
    events: IEvent[]
    landings: Landing[]
    lists: IList[]
    urls: IURL[]   
}
