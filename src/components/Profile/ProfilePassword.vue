<template>
<div>
  <h2>Изменить пароль</h2>
  <form-pwd-input />
</div>
</template>

<script>
import FormPwdInput from "@/components/Profile/Form/FormPwdInput.vue";

export default {
  name: "ProfilePassword",
  components: {FormPwdInput}
}
</script>