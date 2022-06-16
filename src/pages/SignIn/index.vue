<template>
  <div class="sign-in-page">
    <div class="sign-in-page__inner">
      <div class="sign-in-page__logo">
        Авторизация
      </div>

      <form @submit.prevent="handleFormSubmit">
        <div class="sign-in-page__form-item">
          <label for="login">Логин</label>
          <input
            v-model="formModel.login"
            id="login"
            placeholder="Введите логин"
          />
        </div>

        <div class="sign-in-page__form-item">
          <label for="password">Пароль</label>
          <input
            v-model="formModel.password"
            id="password"
            placeholder="Введите пароль"
          />
        </div>

        <button
          class="sign-in-page__btn"
          :disabled="isLoading"
        >
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import type { FormModel, SignInInstance } from './types';

export default defineComponent({
  name: 'SignInPage',

  setup(): SignInInstance {
    const router = useRouter();

    const formModel = reactive<FormModel>({
      login: '',
      password: ''
    });

    const isLoading = ref<boolean>(false);

    const handleFormSubmit = async () => {
      isLoading.value = true;

      try {
        setTimeout(() => {
          router.push('/');
          isLoading.value = false;
        }, 2000);
      } catch (e) {
        console.log('e', e);
      }
    };

    return {
      formModel,
      isLoading,
      handleFormSubmit,
    };
  }
});
</script>

<style
  lang="scss"
  scoped
>
.sign-in-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  &__inner {
    width: 264px;
  }

  &__logo {
    margin-bottom: 16px;
    font-size: 26px;
    font-weight: 700;
    text-align: center;
  }

  &__form {
  }

  &__form-item {
    margin-bottom: 16px;

    label {
      display: block;
      margin-bottom: 4px;
    }

    input {
      display: block;
      width: 100%;
      height: 36px;
      padding-left: 10px;
    }
  }

  &__btn {
    width: 100%;
    height: 40px;
    border: none;
    margin-top: 16px;
    font-size: 16px;
    color: #fff;
    background-color: #4162f0;

    &:hover {
      background-color: #5ecae7;
    }
  }
}
</style>
