<template>
  <div class="card">
    <h1 class="card-title">Мой профиль</h1>
    <div class="card">
      <div class="card__avatar">
        <profile-avatar />
        <div class="card__avatar-btn">
          <button class="btn primary">Изменить фото</button>
          <button class="btn danger">Удалить фото</button>
        </div>
      </div>
      <br>

      <div class="card__info">
        <form-info-input />
      </div>
    </div>
    <div class="card">
      <profile-password />
    </div>
  </div>
</template>

<script>
import ProfileAvatar from "@/components/Profile/ProfileAvatar.vue";
import ProfilePassword from "@/components/Profile/ProfilePassword.vue";
import FormInfoInput from "@/components/Profile/Form/FormInfoInput.vue";

export default {
  name: "ProfileInfo",
  emits: ['uploadChange'],
  setup() {
    let name = 'Test'
    return {
      name
    }
  },
  components: {FormInfoInput, ProfilePassword, ProfileAvatar}
}
</script>

<style scoped lang="sass">
.card__avatar-btn,
.card__info
  display: flex
  align-items: center
  justify-content: center

.btn
  margin-left: 10px

@media (max-width: 320px)
  .card-title
    font-size: 1.3rem
</style>