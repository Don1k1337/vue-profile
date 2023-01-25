<template>
  <select multiple v-model="selectedValues">
    <option disabled>Выберите один из доступных из списка языков</option>
    <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
  </select>
</template>

<script>
export default {
  name: "FormInfoInput",
  setup() {
    return {
        options: [
          { value: 1, label: 'Английский' },
          { value: 2, label: 'Немецкий' },
          { value: 3, label: 'Французский' },
          { value: 4, label: 'Испанский' },
          { value: 5, label: 'Другой' }
        ],
        selectedValues: []
    }
  }
}
</script>

<style scoped lang="sass">
@media (max-width: 320px)
  option
    font-size: 0.6rem
</style>