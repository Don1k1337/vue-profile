<template>
    <Form @submit="onSubmit">
      <div class="form-control" >
        <label for="name">ФИО</label>
        <Field :class="eMsg" name="fullName" type="text" :rules="validateFullName" />
        <ErrorMessage name="fullName" :class="eMsg" />
      </div>
      <div class="form-control" >
        <label for="birthday">Дата рождения</label>
        <Field name="birthday" type="date" :rules="validateBirthday" />
        <ErrorMessage name="birthday" :class="eMsg" />
      </div>
      <div class="form-control" >
        <label for="email">E-mail</label>
        <Field name="eMail" type="text" :rules="validateEmail" />
        <ErrorMessage name="eMail" :class="eMsg" />
      </div>
      <div class="form-control" >
        <label for="city">Город</label>
        <input type="text" id="City" v-model="city">
      </div>
      <div class="form-control">
        <label for="phone">Номер телефона</label>
        <Field name="phone" type="text" :rules="validatePhone" />
        <ErrorMessage name="phone" :class="eMsg" />
      </div>
      <div class="form-control">
        <label for="languages">Владение языками</label>
        <form-lng-input />
      </div>
      <button class="btn primary" :disabled="preventSubmitting">Изменить</button>
    </Form>
</template>

<script>
import FormLngInput from "@/components/Profile/Form/FormLngInput.vue";
import {ErrorMessage, Field, Form} from "vee-validate";
import {checkPhoneNumber} from "@/helpers/phoneMasking";
export default {
  name: "FormInfoInput",
  setup() {
    return {
      eMsg: 'error',
      fullName: '',
      city: '',
      preventSubmitting: false
    }
  },
  methods: {
    validateFullName(value) {
      if (!value || value.length < 3) {
        this.preventSubmitting = true
        return 'Пожалуйста введите ФИО в правильном формате'
      }
      this.preventSubmitting = false
      return true
    },
    validateBirthday(value) {
      if (!value) {
        return true
      }
      const date = new Date(value);
      if (!date.getFullYear() || date.getFullYear() < 1900 || date.getFullYear() > 2023) {
        this.preventSubmitting = true
        return "Доступная дата рождения от 1900 до 2023"
      }
      this.preventSubmitting = false
      return true
    },
    validateEmail(value) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value) {
        this.preventSubmitting = true
        return "Это поле является обязательным"
      }
      if (!regex.test(value)) {
        this.preventSubmitting = true
        return "Пожалуйста укажите правильный формат E-mail адреса"
      }
      this.preventSubmitting = false
      return true;
    },
    validatePhone(value) {
      if (!value) {
        this.preventSubmitting = false
        return true
      }
      if (!checkPhoneNumber(value)) {
        this.preventSubmitting = true
        return "Пожалуйста укажите формат с кодом страны"
      }
      this.preventSubmitting = false
      return true
    },
    onSubmit(e) {
      if (this.preventSubmitting) {
        return
      }
      alert(JSON.stringify(e))
    }

  },
  components: {FormLngInput, Form, Field, ErrorMessage}
}
</script>