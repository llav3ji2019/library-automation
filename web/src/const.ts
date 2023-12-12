export enum AppRoute {
  Main = '/',
  Login = '/login',
  Journal = '/journal',
  Handbook = '/handbook',
  Report = '/player'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum TableStatus {
  CLIENT_STATE,
  BOOK_STATE,
  BOOK_TYPE_STATE
}