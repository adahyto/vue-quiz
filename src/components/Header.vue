<template>
  <div class="header-container">
    <header class="header">
      <h1>AskMeApp</h1>
      <p>History quiz</p>
      <i
        >{{ points.gathered }}/{{ points.gathered + points.missed }} points
        gathered and {{ points.total }} in total</i
      >
    </header>
  </div>
</template>
<script>
export default {
  props: ["points"],
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
