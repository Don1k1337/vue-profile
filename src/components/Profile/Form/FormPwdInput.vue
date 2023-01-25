<template>
  <Form @submit="onSubmit">
    <div class="wrapper">
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
    <button class="btn primary" :disabled="preventSubmitting">Изменить пароль</button>
    </div>
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
  data() {
    return {
      eMsg: 'error',
      newPwd: '',
      confirmPwd: '',
      preventSubmitting: false
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
      let pwdInfo = JSON.parse(localStorage.getItem('PwdInfo'))
      if (!pwdInfo) {
        return true;
      }
      let oldPwd = pwdInfo.oldPwd
      if (value !== oldPwd) {
        return 'Текущий пароль неверен, загляните в LocalStorage'
      }
      return true;
    },

    validateNewPwd(value) {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!value) {
        return 'Это поле является обязательным';
      }
      if (value)
      if (!regex.test(value)) {
        return `Пароль должен содержать хотя бы 1 спец-символ, 1 цифру,
                и быть от 6 до 16 символов в длине.
                Пароль должен быть введен на латинице`;
      }
      this.preventSubmitting = false
      return true;
    },
    validateConfirmPwd(value) {
      if (!value) {
        this.preventSubmitting = true
        return 'Это поле является обязательным';
      }
      if (!this.isConfirmPwdMatch) {
        this.preventSubmitting = true
        return 'Введенные пароли не совпадают'
      }
      this.preventSubmitting = false
      return true
    },
    onSubmit(e) {
      if (this.preventSubmitting) {
        return
      }
      localStorage.setItem('PwdInfo', JSON.stringify(e))
      alert('Данные сохранены в LocalStorage')
    }
  },
  mounted() {
    let data = JSON.parse(localStorage.getItem('PwdInfo'))
    if (data) {
      this.data = data
    }
  }
}
</script>
