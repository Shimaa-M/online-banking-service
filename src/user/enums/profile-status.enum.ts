export enum ProfileStatusEnum {
  ACCOUNT_COMPLETE = 'ACCOUNT_COMPLETE',
  VERIFIED = 'VERIFIED',
  PENDING_PASSWORD_CREATION = 'PENDING_PASSWORD_CREATION',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const ProfileStatusGroup = {
  REGISTRATION: [
    ProfileStatusEnum.ACCOUNT_COMPLETE,
    ProfileStatusEnum.VERIFIED,
  ],
  PROFILE: [
    ProfileStatusEnum.PENDING_PASSWORD_CREATION,
    ProfileStatusEnum.ACTIVE,
    ProfileStatusEnum.INACTIVE,
    ProfileStatusEnum.ARCHIVED,
  ],
  DISABLED: [ProfileStatusEnum.INACTIVE, ProfileStatusEnum.ARCHIVED],
  Activity: [ProfileStatusEnum.INACTIVE, ProfileStatusEnum.ACTIVE],
};
