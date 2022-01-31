<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
