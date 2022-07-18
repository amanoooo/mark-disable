<template>
    <div class="mrow-container">
        <div class="wrapper" v-for="item in list" :key="item.url">
            <li class="li" :title="item" :class="item.isBlocked ? 'blocked': ''">{{ item.url }}</li>
            <button class="btn" :disabled="item.isBlocked" @click="onClick(item)">{{ item.isBlocked ? 'Blocked' : 'Commit' }}</button>
        </div>
    </div>
</template>

<script>
// import Axios from 'axios'
import axios from 'axios'

// type UrlInfo = { url: String, isBlocked: Boolean}[]
export default {
  data () {
    return {}
  },
  props: {
    list: []
  },
  methods: {
    async onClick (e) {
      console.log('e', e)
      const response = await axios.post('http://localhost:8080/url/commit', { url: e })
      console.log('x response', response)
    }
  }
}
</script>

<style lang="scss" scoped>
.mrow-container {
    // display: flex;

    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        .li {
            max-width: 600px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // cursor: grab;
        }
        .blocked {
            text-decoration:line-through;
        }
        .li:hover {
            // cursor: grab;
        }

        .btn {
            // width: 100px;
        }
    }

    .wrapper:first-child {
margin-top: 0;
    }
}
</style>
