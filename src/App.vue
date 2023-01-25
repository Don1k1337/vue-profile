<template>
  <main-layout />
  <ProfileInfo />
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import ProfileInfo from "@/components/Profile/ProfileInfo.vue";

export default {
  name: 'App',
  components: {
    ProfileInfo,
    MainLayout
  }
}
</script>
