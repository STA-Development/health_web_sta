export enum MemberSelectType {
  Dependent = 'dependent',
  You = 'you',
  New = 'new',
}

export enum MemberConfirmActionType {
  Merge = 'MERGE',
  New = 'NEW',
}

export interface IDependent {
  id: string
  firstName: string
  resultsCount?: string
  isSelected?: boolean
}
