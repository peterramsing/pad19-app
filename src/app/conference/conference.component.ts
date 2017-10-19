import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Conference {
  conferenceName: string;
  conferenceDate: object;
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

  constructor(
    private modalService: NgbModal,
    private readonly afs: AngularFirestore,
    public readonly afAuth: AngularFireAuth
  ) {
    this.newConferenceDate = {};
    this.newConferenceName = '';
    this.user = afAuth.authState;
    this.afAuth.authState.subscribe(data => this.user = data);

    // FIXME: Needs to be able to not have issues with loading only conferences
    // made by this issue.
    this.conferenceCollection = afs.collection<Conference>('conferences', ref => ref.where('createdBy', '==', 'ksldj'));
    this.conferences = this.conferenceCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Conference;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
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
