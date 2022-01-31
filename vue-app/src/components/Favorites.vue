<template>
  <div class="card">
    <div class="image">
      <img
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        @click="routeToVideo"
        :src="imageUrl"
        alt=""
      />
    </div>
    <div class="content">
      <div class="item">
        <h2>{{ video.title }}</h2>
      </div>
      <div class="item">
        <div class="item-bottom">{{ video.viewCount }} görüntülenme</div>
        <div class="item-bottom">
          {{ video.publishDateInMonth }} ay önce yayınlandı
        </div>
      </div>
      <div class="item">
        <div class="channel-logo">
          <img :src="profilePhoto" alt="" />
        </div>
        <div class="channel-name">{{ video.ownerName }}</div>
      </div>
      <div class="item description">{{ video.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoriteCard",
  data() {
    return {
      imageUrl: this.video.coverImage,
      profilePhoto: this.video.ownerImage,
    };
  },
  props: ["video"],
  methods: {
    mouseOver() {
      this.imageUrl = this.video.hoverImage;
    },
    mouseLeave() {
      this.imageUrl = this.video.coverImage;
    },
    routeToVideo() {
      this.$router.push({ path: "/watch", query: { id: this.video.id } });
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  width: 850px;
  margin: 15px auto;
}

.image {
  width: 360px;
  height: 200px;
  flex-shrink: 0;
}

.image img {
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.item {
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
}

.item-bottom {
  padding-right: 7px;
}

.channel-logo {
  width: 24px;
  height: 24px;
  padding: 5px 5px;
}

.channel-logo img {
  width: 24px;
  height: 24px;
  border-radius: 100%;
}

.channel-name {
  width: auto;
  padding: 7px;
}

.description {
  font-size: smaller;
}
</style>
