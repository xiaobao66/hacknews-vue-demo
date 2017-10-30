<template>
    <div class="header-container">
        <img src="../assets/y18.gif" alt="logo" class="header-logo">
        <a href="#/" class="header-title">Hacker News</a>
        <ul class="header-nav">
            <li v-for="item in items">
                <router-link :to="item.url">{{item.content}}</router-link>
            </li>
        </ul>
        <router-link to="/login" class="header-login">login</router-link>
    </div>
</template>

<style scoped>
    .header-container {
        display: flex;
        align-items: center;
        background: #ff6600;
        font-size: 10pt;
        padding: 2px 10px 2px 2px;
    }

    .header-logo {
        border: 1px solid #fff;
        height: 18px;
    }

    .header-title {
        font-weight: bold;
        text-decoration: none;
        color: #000;
        margin-left: 10px;
    }

    .header-nav, .header-nav li {
        display: inline-block;
    }

    .header-nav {
        padding-left: 10px;
        margin: 0;
        flex-grow: 1;
    }

    .header-nav li {
        font-size: 0;
    }

    .header-nav li:not(:first-child)::before {
        content: '|';
        margin: 0 6px;
        font-size: 10pt;
    }

    .header-nav a {
        text-decoration: none;
        color: #000;
        font-size: 10pt;
    }

    .header-login {
        margin-left: 20px;
        text-decoration: none;
        color: #000;
    }

    .header-nav .header-link-active {
        color: #fff;
    }

    /*.header-nav a:hover, .header-login:hover {
        text-decoration: underline;
    }*/
</style>

<script>
    // let urlPrefix = 'https://news.ycombinator.com'
    let urlPrefix = ''

    export default {
        data() {
            return {
                items: [
                    {url: `${urlPrefix}/newest`, content: 'new'},
                    {url: `${urlPrefix}/newcomments`, content: 'comments'},
                    {url: `${urlPrefix}/show`, content: 'show'},
                    {url: `${urlPrefix}/ask`, content: 'ask'},
                    {url: `${urlPrefix}/jobs`, content: 'jobs'},
                    {url: `${urlPrefix}/submit`, content: 'submit'}
                ]
            }
        }
    }
</script>