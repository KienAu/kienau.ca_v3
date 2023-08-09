<script setup>
  const data = defineProps({ blok: Object })

  const darkMode = data.blok.dark_mode

  onMounted(() => {
    const body = document.querySelector('body')
    if (darkMode === true) {
      body.classList.add('body--on-dark-mode')
    } else if (darkMode === false) {
      body.classList.remove('body--on-dark-mode')
    }
  })


</script>

<template>
    <div id="Page" v-editable="blok" >
      <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" :darkmode="darkMode" />
    </div>
</template>
   
