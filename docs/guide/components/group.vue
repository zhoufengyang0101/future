<template>
    <div class="group-wrap">
        <h2>{{ title }}</h2>
        <p>{{ desc }}</p>
        <group-item v-for="(item, index) in items" :item="item" :key="index" class="group-item"></group-item>
    </div>
</template>

<script>
import GroupItem from "./groupItem.vue";
export default {
    components: {
        GroupItem,
    },
    props: ["title", "desc", "items"],
    methods: {},
};
</script>


<style lang="sass" scoped>
.group-item
    display: flex
    width: 300px
</style>
