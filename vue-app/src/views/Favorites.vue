<template>
  <div>
    <div class="header">
      <button @click="navigateToFavoritePage" class="favorites-page">
        Favorites
      </button>
    </div>
    
    <div class="favorites">
      <h2>Favorilere eklediğiniz video sayısı: {{favoriteCount}}</h2>
      <Card v-for="item in favoriteVideos" :key="item.id" :video="item"></Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Favorites.vue";
import {mapGetters,mapState} from "vuex";

export default {
  name: "Favorites",
  props: ["favorites"],
  components: {
    Card,
  },
  methods: {
    navigateToFavoritePage() {
      this.$router.push({ name: "Favorites", params: { userid: "bootcamp" } });
    },
  },
  computed: {
    ...mapGetters({
      favoriteCount: "getFavoriteCount",
    }),
    ...mapState([
      "favoriteVideos",
    ])
  },
};
</script>

<style scoped>
.favorites-page {
  width: 75px;
  height: 30px;
  margin-top: 20px;
  margin-right: 15px;
  margin-left: auto;
}
.header {
  width: 100%;
  height: 70px;
  background-color: red;
  display: flex;
}
h2 {
  padding-top: 20px;
  text-align: center;
}
</style>
