<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'SINGLELOGIN',
  data() {
    return {
    }
  },
  created() {
    let urlQuery = this.$route.query
    let singleSign = urlQuery.singleSign
    let customeTel = urlQuery.customeTel
    let tokenOF = urlQuery.tokenOF
    if (singleSign == 'SINGLESIGN' && customeTel) {
      let singleSignParam = {
        username: customeTel,
        password: tokenOF,
        singleType: 'SINGLESIGN'
      }
      this.$store.dispatch('Login', singleSignParam).then(() => {
        this.$router.push({ path: this.redirect || '/' })
      }).catch(() => {
      })
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
