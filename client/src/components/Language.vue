<template>
  <div class="lang">
    <button @click="setLang('en')">English</button>
    <button @click="setLang('vi')">Việt Nam</button>
  </div>
</template>

<script>
export default {
  name: 'Language',
  data () {
    return {
    }
  },
  methods: {
    setLang (lang) {
      this.$store.dispatch('setLang', lang)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
