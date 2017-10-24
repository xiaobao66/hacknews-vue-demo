<template>
    <div v-if="loading">
        <p style="padding-left: 10px;">loading...</p>
    </div>
    <div class="news-container" v-else>
        <news-item :news-item="item" :rank="index + 1" v-for="(item, index) in newsItems" :key="item.id"></news-item>
    </div>
</template>

<script>
    import $ from 'jquery'
    import NewsItem from './NewsItem'

    export default {
        components: {
            NewsItem
        },
        data() {
            return {
                loading: true,
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
                    return Promise.all(stories.slice(0, 30).map(itemId => _this.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)))
                })
                .then(function (newsItems) {
                    _this.newsItems = newsItems
                    _this.loading = false
                })
                .catch(function (err) {
                    console.error('error occur', err)
                })
        }
    }
</script>