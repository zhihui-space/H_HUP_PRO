<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      name: 'App'
    }
  },
  mounted(){
    if (window.screen.width=='1366') {
      document.write ('<body style="zoom: 75%">')
    } else if (window.screen.width=='1360') {
      document.write ('<body style="zoom: 75%">')
    } else if (window.screen.width=='1440') {
      document.write ('<body style="zoom: 85%">')
    }
  }
}
</script>
