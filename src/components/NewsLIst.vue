<template>
    <div v-if="loading">
        <p style="padding-left: 10px;">loading...</p>
    </div>
    <div class="news-container" v-else>
        <p style="padding-left: 10px;" v-if="newsItems.length === 0">暂无消息</p>
        <news-item :news-item="item" :rank="index + 1" v-for="(item, index) in newsItems" :key="item.id"
                   v-else></news-item>
    </div>
</template>

<script>
    import $ from 'jquery'
    import NewsItem from './NewsItem'
    import config from '../config'

    export default {
        components: {
            NewsItem
        },
        data() {
            return {
                loading: true,
                newsItems: [],
                currentPath: ''
            }
        },
        watch: {
            '$route': 'getNewsByCategory'
        },
        methods: {
            get(url) {
                return Promise.resolve($.ajax(url))
            },
            getNewsByCategory(route) {
                let _this = this

                _this.currentPath = route.path

                if (!config[route.path]) {
                    _this.loading = false
                    return;
                }

                _this.get(config[route.path])
                    .then(function (stories) {
                        return Promise.all(stories.slice(0, 30).map(itemId => _this.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)))
                    })
                    .then(function (newsItems) {
                        if(route.path !== _this.currentPath) {
                            return;
                        }
                        _this.newsItems = newsItems
                        _this.loading = false
                    })
                    .catch(function (err) {
                        console.error('error occur', err)
                    })
            }
        },
        mounted() {
            let _this = this

            _this.currentPath = _this.$route.path
            _this.getNewsByCategory(_this.$route)
        },
        beforeRouteLeave(to, from, next) {
            this.loading = true
            this.newsItems = []
            next()
        }
    }
</script>