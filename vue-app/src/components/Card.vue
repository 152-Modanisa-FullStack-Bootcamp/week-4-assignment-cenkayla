<template>
  <div class="card">
    <img
      class="star"
      src="../assets/star3.png"
      alt=""
      @click="addFavorite()"
      :class="{ favorited }"
    />
    <div class="content-image">
      <img id="image"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        @click="routeToVideo"
        :src="imageUrl"
        alt=""
      />
    </div>
    <div class="content">
      <div class="profile-photo">
        <img :src="profilePhoto" alt="" />
      </div>
      <div class="context">
        <div class="item">
          <h4>{{ video.title }}</h4>
        </div>
        <div class="item">{{ video.ownerName }}</div>
        <div class="item last-child">
          <div>{{ video.viewCount }}</div>
          <div>{{ video.publishDateInMonth }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["video"],
  data() {
    return {
      imageUrl: this.video.coverImage,
      profilePhoto: this.video.ownerImage,
      favorited: false,
    };
  },
  methods: {
    mouseOver() {
      this.imageUrl = this.video.hoverImage;
    },
    mouseLeave() {
      this.imageUrl = this.video.coverImage;
    },
    routeToVideo() {
      this.$router.push({ path: "watch", query: { id: this.video.id } });
    },
    addFavorite() {
      this.favorited = !this.favorited;
      this.$store.dispatch("favoriteStatusChanged",this.video)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
}
.card {
  display: flex;
  flex-direction: column;
  width: 360px;
  height: auto;
  position: relative;
}
.star {
  position: absolute;
  top: 10px;
  right: 5px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.star.favorited {
  filter: grayscale(100%);
}
.content {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
}
.profile-photo {
  width: 10%;
  height: 36px;
}
.profile-photo img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: auto;
}
.content-image {
  width: 360px;
  height: 200px;
}
.content-image img {
  width: 100%;
  height: 100%;
}
.context {
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
  width: 90%;
}
.item {
  width: 100%;
}
.last-child {
  display: flex;
  flex-direction: row;
}
.last-child div {
  padding-right: 5px;
}
</style>
