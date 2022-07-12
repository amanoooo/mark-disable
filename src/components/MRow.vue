<template>
    <div class="mrow-container">
        <div class="wrapper" v-for="item in list" :key="item">
            <li class="li" :title="item">{{ item }}</li>
            <button class="btn">Commit</button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    list: []
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
