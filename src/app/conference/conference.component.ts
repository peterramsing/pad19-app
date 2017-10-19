import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './../core/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Conference {
  conferenceName: string;
  conferenceDate?: object;
  created: number;
  createdBy: string;
}
export interface ConferenceId extends Conference {
  id: string;
}

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {
  private conferenceCollection: AngularFirestoreCollection<Conference>;
  private modalRef: NgbModalRef;

  conferences: Observable<ConferenceId[]>;

  newConferenceDate: object;
  newConferenceName: string;
  user: any;

  constructor(private modalService: NgbModal,
              private readonly afs: AngularFirestore,
              private auth: AuthService) {
    this.newConferenceDate = {};
    this.newConferenceName = '';

    auth.user.subscribe(user => {
      this.user =  user;

      if (user) {
        this.conferenceCollection = afs.collection<Conference>('conferences', ref => ref.where('createdBy', '==', this.user.uid));
        this.conferences = this.conferenceCollection.snapshotChanges().map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Conference;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
      }
    });
  }

  ngOnInit() {
  }

  openCreateConferenceModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  // This is used for the example name so it always feels relevant
  get thisYear() {
    return (new Date()).getFullYear() + 1
  }

  createConference() {
    // TODO: Validation
    this.conferenceCollection.add({
      conferenceName: this.newConferenceName,
      conferenceDate: this.newConferenceDate,
      created: Date.now(),
      createdBy: this.user.uid,
    });
    // TODO: Error handling
    this.modalRef.close();
    this.newConferenceDate = null;
    this.newConferenceName = null;
  }

}
