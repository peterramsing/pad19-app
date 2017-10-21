import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.css']
})

export class ConferenceDetailComponent implements OnInit {
  conferenceDoc: AngularFirestoreDocument<Conference>;
  private subRoute: any;

  conference: Observable<Conference>;
  conferenceId: string;

  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      this.conferenceId = params['id'];
    });

    this.conferenceDoc = this.afs.doc<Conference>(`conferences/${this.conferenceId}`);
    this.conference = this.conferenceDoc.valueChanges()
    // console.log(this.foo)
  }

}
