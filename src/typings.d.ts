/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface User {
  uid: string;
  email: string;
  dipslayName: string;
  photoURL: string;
}

interface Conference {
  conferenceName: string;
  conferenceDate?: object;
  created: number; // FIXME! - createdAt
  createdBy: string;
}

interface Survey {
  surveyName: string;
  surveyStartDate?: object;
  surveyEndDate?: object;
  createdAt: number;
  createdBy: string;
}
