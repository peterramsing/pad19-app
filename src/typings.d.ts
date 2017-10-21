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
  created: number;
  createdBy: string;
}
