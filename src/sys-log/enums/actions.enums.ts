export enum ActionsEnum {
  UPLOADFILE = 'Upload File',
  /*
   *User
   */
  SIGNUP = 'Sign Up',
  LOGIN = 'Log In',
  CREATE_USER = 'Create User',
  SEARCH_USER = 'Search User',
  GET_ME_USER = 'Get Me User',
  UPDATE_ME_USER = 'Update Me User',
  DELETE_ME_USER = 'Delete Me User',
  GET_USER = 'Get User',
  UPDATE_USER = 'Update User',
  DELETE_USER = 'Delete User',



  /**
   * Account
   */

  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  GET_ACCOUNTS='GET_ACCOUNTS',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER='TRANSFER',

 
  /*
   * logs
   */
  SEARCH_LOGS = 'SEARCHLOGS',
  GET_LOG = 'GETLOG',
  DELETE_LOG = 'DELETELOG',
}

export const ActionsGroups = {
  USER: [
    ActionsEnum.CREATE_USER,
    ActionsEnum.SEARCH_USER,
    ActionsEnum.GET_ME_USER,
    ActionsEnum.UPDATE_ME_USER,
    ActionsEnum.DELETE_ME_USER,
    ActionsEnum.GET_USER,
    ActionsEnum.UPDATE_USER,
    ActionsEnum.DELETE_USER,
  ],
  ACCOUNT: [ActionsEnum.CREATE_ACCOUNT, ActionsEnum.DEPOSIT, ActionsEnum.WITHDRAW],
  LOGS: [ActionsEnum.SEARCH_LOGS, ActionsEnum.GET_LOG, ActionsEnum.DELETE_LOG],
};
