export enum AppRoute {
  Main = '/',
  Login = '/login',
  Journal = '/journal',
  Handbook = '/handbook',
  Report = '/report'
}

export enum AuthorizationStatus {
  Unknown = 'UNKNOWN',
  Admin = 'ADMIN',
  Worker = 'WORKER',
}

export enum TableStatus {
  CLIENT_STATE,
  BOOK_STATE,
  BOOK_TYPE_STATE
}
