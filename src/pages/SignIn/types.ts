import type { Ref } from 'vue';

export interface FormModel {
  login: string;
  password: string;
}

export interface SignInInstance {
  formModel: FormModel;
  isLoading: Ref<boolean>;
  handleFormSubmit: () => void;
}
