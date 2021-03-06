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
  displayedColumns: string[] = ['Subject', 'Sender', 'Details', 'Date', 'Votes', 'Upvote', 'Downvote'];

  ngOnInit() {
    this.is.getIncidents().snapshotChanges().subscribe(data => {
      let incidentList = [];
      for(let i = 0; i < data.length; i++) {
        let obj = data[i].payload.doc.data();
        let id = data[i].payload.doc.id;
        let incident = new Incident(obj.subject, obj.sender, obj.details, obj.votes, obj.send_date, id);
        incidentList.push(incident);
      }
      this.incidents = incidentList.sort((a,b) => (b.votes - a.votes));
    });
  }

  upvote(id: string, votes: number){
    this.is.updateIncident(id, {votes: votes + 1});
  }

  downvote(id: string, votes: number){
    this.is.updateIncident(id, {votes: votes - 1});
  }

}
