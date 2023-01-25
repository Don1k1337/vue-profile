<template>
  <Form @submit="onSubmit">
    <div class="form-control" >
      <label>
        Текущий пароль:
        <Field name="oldPwd" type="password" :rules="validateOldPwd" />
        <ErrorMessage name="oldPwd" :class="eMsg" />
      </label>
    </div>
    <div class="form-control" >
      <label>
        Новый пароль:
        <Field name="newPwd" type="password" :rules="validateNewPwd" v-model="newPwd" @input="validateConfirmPwd" />
        <ErrorMessage name="newPwd" :class="eMsg" />
      </label>
    </div>
    <div class="form-control" >
      <label>
        Подтверждение нового пароля:
        <Field name="confirmPwd" type="password" :rules="validateConfirmPwd" v-model="confirmPwd" @input="validateConfirmPwd" />
        <ErrorMessage name="confirmPwd" :class="eMsg" />
      </label>
    </div>
    <button class="btn primary">Изменить пароль</button>
  </Form>
</template>


<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'FormPwdInput',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    return {
      eMsg: 'error',
      newPwd: '',
      confirmPwd: ''
    }
  },
  computed: {
    isConfirmPwdMatch() {
      return this.newPwd === this.confirmPwd
    }
  },
  methods: {
    validateOldPwd(value) {
      if (!value) {
        return 'Это поле является обязательным';
      }
      return true;
    },
    validateNewPwd(value) {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!value) {
        return 'Это поле является обязательным';
      }
      if (!regex.test(value)) {
        return `Пароль должен содержать хотя бы 1 спец-символ, 1 цифру,
                и быть от 6 до 16 символов в длине.
                Пароль должен быть введен на латинице`;
      }
      return true;
    },
    validateConfirmPwd(value) {
      if (!value) {
        return 'Это поле является обязательным';
      }
      if (!this.isConfirmPwdMatch) {
        return 'Введенные пароли не совпадают'
      }
      return true
    },
    onSubmit(e) {
      console.log(e.value)
    }
  }
}
</script>

<style scoped lang="sass">
.form-control
  display: grid
  grid-template-columns: 1fr
  justify-content: center
</style>