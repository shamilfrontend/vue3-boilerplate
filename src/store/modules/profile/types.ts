import type { Nullable } from '#/types';

export interface ProfileState {
  userId: Nullable<string>;
}

export interface UserData {
  userId: Nullable<string>;
  access?: string;
  refresh?: string;
}
