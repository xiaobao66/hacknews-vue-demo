<template>
    <div class="container">
        <news-header></news-header>
        <router-view></router-view>
    </div>
</template>

<style scoped>
    .container {
        width: 85%;
        margin: 0 auto;
        background-color: #f6f6ef;
    }
</style>

<script>
    import $ from 'jquery'
    import NewsHeader from './components/NewsHeader'

    export default {
        components: {
            NewsHeader
        }
    }
</script>