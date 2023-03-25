---
layout: home
layoutClass: 'guide-page'
---

<script setup>
import Group from './components/group.vue'

import { DATA } from './const.js'
</script>

<!-- <span v-for="i in 10">{{ i }}</span> -->
<Group v-for="{title, desc, items} in DATA" :title="title" :desc="desc" :items="items"></Group>

<style src="./index.sass"></style>

<!-- <style lang="sass">
    .guide-page
        padding: 100px
</style> -->
