<template>
    <div class="container">
        <news-header></news-header>
        <div class="news-container">
            <news-item :news-item="item" :rank="index + 1" v-for="(item, index) in newsItems" :key="item.id"></news-item>
        </div>
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
    import NewsItem from './components/NewsItem'

    export default {
        components: {
            NewsHeader,
            NewsItem
        },
        data() {
            return {
                newsItems: []
            }
        },
        methods: {
            get(url) {
                return Promise.resolve($.ajax(url))
            }
        },
        mounted() {
            let _this = this

            _this.get('https://hacker-news.firebaseio.com/v0/topstories.json')
                .then(function (stories) {
                    return Promise.all(stories.slice(0, 30).map(itemId => _this.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)));
                })
                .then(function (newsItems) {
                    _this.newsItems = newsItems;
                })
                .catch(function (err) {
                    console.error('error occur', err);
                })
        }
    }
</script>