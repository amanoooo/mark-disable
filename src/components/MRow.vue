<template>
    <div class="mrow-container">
        <div class="wrapper" v-for="item, index in list" :key="item.url">
            <li class="li" :title="item.url" :class="item.isBlocked ? 'blocked': ''">{{ item.url }}</li>
            <button class="btn" :disabled="item.isBlocked" @click="onClick(index)">{{ item.isBlocked ? 'Blocked' : 'Commit' }}</button>
        </div>
    </div>
</template>

<script>
// import Axios from 'axios'

// type UrlInfo = { url: String, isBlocked: Boolean}[]
export default {
  data () {
    return {}
  },
  props: {
    list: [],
    isTab: Boolean
  },
  methods: {
    async onClick (index) {
      this.$emit('commitOne', index, this.isTab)
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
            min-width : 300px;
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
