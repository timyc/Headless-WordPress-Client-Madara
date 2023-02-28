<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    methods: {
        showMenu() {
            
            let ele = document.getElementsByClassName('popup-menus-container')[0] as HTMLElement;
            if (this.isHidden) {
                ele.classList.add("a-scale-in-ease");
                this.isHidden = !this.isHidden;
                setTimeout(() => {
                    ele.classList.remove("a-scale-in-ease");
                }, 300);
            } else {
                ele.classList.add("a-scale-out-ease");
                setTimeout(() => {
                    ele.classList.remove("a-scale-out-ease");
                    this.isHidden = !this.isHidden;
                }, 300);
            }

        }
    },
    data() {
        return {
            sharing: {
                url: window.location.href,
                title: 'I found a great webtoon at Manga Abyss!',
                description: 'Hey, check this awesome webtoon out at Manga Abyss! You will not be disappointed!',
                quote: 'I love reading at Manga Abyss!',
                hashtags: 'manga,webtoon,trilliux',
                twitterUser: 'TrilliuxWebtoon'
            },
            networks: [
                { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
                { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
                { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
            ],
            isHidden: true,
        }
    }
});
</script>

<template>
    <div :class="['popup-menus-container', 'p-relative', 'page-matching-button']" :style="{ display: isHidden ? 'none' : 'block' }">
        <div class="animation-element w-100 h-100 p-absolute">
            <div class="popup-menus p-absolute border-box bottom">
                <br />
                <div class="share-options">
                    <ShareNetwork v-for="network in networks" :network="network.network" :key="network.network"
                        :style="{ backgroundColor: network.color }" :url="sharing.url" :title="sharing.title"
                        :description="sharing.description" :quote="sharing.quote" :hashtags="sharing.hashtags"
                        :twitterUser="sharing.twitterUser">
                        <h3 class="m-auto">{{ network.name }}</h3><br />
                    </ShareNetwork>
                </div>
            </div>
        </div>
    </div>
    <div :class="['share-icon', 'bg-center', 'bg-no-repeat', 'dp-i-block', 'v-middle']" @click="showMenu"></div>
</template>

<style scoped>
.share-icon {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTEzLjUgMTFjLTAuNzA2IDAtMS4zNDIgMC4yOTMtMS43OTcgMC43NjNsLTYuNzM0LTMuMzY3YzAuMDIxLTAuMTI5IDAuMDMyLTAuMjYxIDAuMDMyLTAuMzk2cy0wLjAxMS0wLjI2Ny0wLjAzMi0wLjM5Nmw2LjczNC0zLjM2N2MwLjQ1NSAwLjQ3IDEuMDkxIDAuNzYzIDEuNzk3IDAuNzYzIDEuMzgxIDAgMi41LTEuMTE5IDIuNS0yLjVzLTEuMTE5LTIuNS0yLjUtMi41LTIuNSAxLjExOS0yLjUgMi41YzAgMC4xMzUgMC4wMTEgMC4yNjcgMC4wMzEgMC4zOTZsLTYuNzM0IDMuMzY3Yy0wLjQ1NS0wLjQ3LTEuMDkxLTAuNzYzLTEuNzk3LTAuNzYzLTEuMzgxIDAtMi41IDEuMTE5LTIuNSAyLjVzMS4xMTkgMi41IDIuNSAyLjVjMC43MDYgMCAxLjM0My0wLjI5MyAxLjc5Ny0wLjc2M2w2LjczNCAzLjM2N2MtMC4wMjEgMC4xMjktMC4wMzEgMC4yNjEtMC4wMzEgMC4zOTYgMCAxLjM4MSAxLjExOSAyLjUgMi41IDIuNXMyLjUtMS4xMTkgMi41LTIuNWMwLTEuMzgxLTEuMTE5LTIuNS0yLjUtMi41eiI+PC9wYXRoPgo8L3N2Zz4K);
    background-repeat: no-repeat;
}

.popup-menus-container .popup-menus {
    background: rgba(37, 3, 57, 0.95);
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 16%);
    border-radius: .33333rem;
    font-size: 1.16667rem;
    line-height: 20px;
    white-space: nowrap;
    text-align: left;
    letter-spacing: 0;
}

.popup-menus-container .popup-menus.bottom {
    right: -6px;
    top: 10px;
}

.share-options {
    width: 18.33333rem;
    padding: 0 1.5rem;
    color: #1c1c1f;
}
#share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}

a[class^="share-network-"] {
  flex: none;
  color: #FFFFFF;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
  text-decoration: none;
}

a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1;
  font-weight: 500;
}

a.share-network-twitter {
  background-color: #1da1f2;
}
.a-scale-in{
    animation:scale-in .4s cubic-bezier(.22,.58,.12,.98)
}
.a-scale-in-ease{
    animation:scale-in-ease .4s cubic-bezier(.22,.58,.12,.98)
}
.a-scale-out{
    animation:scale-out .4s cubic-bezier(.22,.58,.12,.98)
}
.a-scale-out-ease{
    animation:scale-out-ease .4s cubic-bezier(.22,.58,.12,.98)
}
@keyframes scale-in{
    0%{
        transform:scale(0)
    }
    to{
        transform:scale(1)
    }
}
@keyframes scale-in-ease{
    0%{
        transform:scale(0)
    }
    50%{
        transform:scale(1.1)
    }
    to{
        transform:scale(1)
    }
}
@keyframes scale-out{
    0%{
        opacity:1;
        transform:scale(1)
    }
    to{
        opacity:0;
        transform:scale(.8)
    }
}
@keyframes scale-out-ease{
    0%{
        transform:scale(1)
    }
    50%{
        transform:scale(1.1)
    }
    to{
        transform:scale(0)
    }
}
</style>