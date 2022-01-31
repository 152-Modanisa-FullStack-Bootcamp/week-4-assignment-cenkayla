<template>
  <div>
    <div class="header">
      <button @click="navigateToFavoritePage" class="favorites">
        Favorites
      </button>
    </div>
    <div class="home">
      <Card
        class="card"
        v-for="video in videos"
        :data-id="video.id"
        :key="video.id"
        :video="video"
        @add-favorite="addFavorite"
      ></Card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  data() {
    return {
      videos: [],
      favorites: [],
    };
  },
  components: {
    Card,
  },
  methods: {
    addFavorite(video) {
      let index = this.favorites.findIndex((item) => item.id === video.id);
      if (index === -1) {
        this.favorites.push(video);
      } else {
        this.favorites.splice(index, 1);
      }
    },
    navigateToFavoritePage() {
      this.$router.push({
        name: "Favorites",
        params: {
          favorites: this.favorites,
        },
      });
    },
    getVideos() {
      axios
        .get(
          "https://my-json-server.typicode.com/modanisa/bootcamp-video-db/videos"
        )
        .then((response) => {
          this.videos = response.data;
        });
    },
  },
  created() {
    this.getVideos();
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 20px;
  padding-left: 12px;
}
.card {
  margin: 5px;
  margin-bottom: 10px;
}
.header {
  width: 100%;
  height: 70px;
  background-color: red;
  display: flex;
}
.favorites {
  width: 75px;
  height: 30px;
  margin-top: 20px;
  margin-right: 15px;
  margin-left: auto;
}
</style>
