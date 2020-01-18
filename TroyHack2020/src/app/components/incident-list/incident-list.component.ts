import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {

  constructor(private is : IncidentService) { }

  incidents: Array<Incident>;

  ngOnInit() {
    this.is.getIncidents().get().subscribe(data => {
      let incidentList = [];
      for(let i = 0; i < data.docs.length; i++) {
          let obj = data.docs[i].data();
          let incident = new Incident(obj.subject, obj.sender, obj.details, obj.votes, obj.send_date);
          incidentList.push(incident);
      }
      console.log(incidentList);
      this.incidents = incidentList;
    })
  }

}