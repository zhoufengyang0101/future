<template>
    <div class="block-wrap">
        <div class="block-header">
            <div class="header-icon">
                <img :src="item.icon" alt="">
            </div>
            <div class="header-title">{{item.title}}</div>
        </div>
        <div class="block-content"> 
            <p>{{ item.info }}</p>
            <p>{{ item.version }}</p>
        </div>
        <div class="block-footer">
            <div v-for="(link, index) in item.links" :key="index">
                <img src="" alt="">
                <span @click="handleClick(link)">点击</span>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props: [
        "item"
    ],
    methods: {
        handleClick(link) {
            window.open(link.href)
        }
    }
}
</script>


<style lang="sass">

</style>
