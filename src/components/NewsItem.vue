<template>
    <div class="news-item">
        <div class="news-item-rank">{{rank}}.</div>
        <div class="news-item-vote">
            <a :href="`https://news.ycombinator.com/vote?id=${newsItem.id}&how=up&goto=news`">
                <img src="../assets/grayarrow.gif" alt="vote">
            </a>
        </div>
        <div class="news-item-text">
            <div class="news-item-title">
                <a :href="newsItem.url">{{newsItem.title}}</a>
                <template v-if="newsItem.url">
                    <span class="news-item-domain">(<a :href="`https://news.ycombinator.com/from?site=${newsDomain}`">{{newsDomain}}</a>)</span>
                </template>
            </div>
            <div class="news-item-subtext">
                {{newsItem.score}} points by <a :href="`https://news.ycombinator.com/user?id=${newsItem.by}`">{{newsItem.by}}</a>
                <a :href="`https://news.ycombinator.com/item?id=${newsItem.id}`">{{newsTime}}</a> | <a :href="`https://news.ycombinator.com/item?id=${newsItem.id}`">{{this.getComment(newsItem)}}</a>
            </div>
        </div>
    </div>
</template>

<style>
    .news-item {
        display: flex;
        color: #828282;
        margin-top: 5px;
        align-items: baseline;
        list-style: none;
    }

    .news-item-text {
        flex-grow: 1;
    }

    .news-item-title > a {
        color: #000;
        font-size: 10pt;
        text-decoration: none;
    }

    /*.news-item-title > a:hover {
        text-decoration: underline;
    }*/

    .news-item-domain {
        font-size: 8pt;
        margin-left: 5px;
    }

    .news-item-domain > a {
        color: #828282;
        text-decoration: none;
    }

    .news-item-domain > a:hover {
        text-decoration: underline;
    }

    .news-item-rank {
        flex-basis: 25px;
        font-size: 10pt;
        text-align: right;
    }

    .news-item-vote {
        flex-basis: 15px;
        text-align: center;
    }

    .news-item-subtext {
        font-size: 7pt;
    }

    .news-item-subtext > a {
        color: #828282;
        text-decoration: none;
    }

    .news-item-subtext > a:hover {
        text-decoration: underline;
    }
</style>

<script>
    import URL from 'url'
    import moment from 'moment'

    export default {
        props: ['rank', 'newsItem'],
        computed: {
            newsDomain() {
                return URL.parse(this.newsItem.url).hostname
            },
            newsTime() {
                return moment.utc(this.newsItem.time * 1000).fromNow()
            }
        },
        methods: {
            getComment(newsItem) {
                let commentText = 'discuss'
                if (newsItem.kids && newsItem.kids.length > 0) {
                    commentText = `${newsItem.kids.length} comment`
                }

                return commentText
            }
        }
    }
</script>