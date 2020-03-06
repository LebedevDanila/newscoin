<template>
  <div id="app">
  	<Header />
  	<SearchModal v-if="this.$store.getters.isOpenSearchModal" />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import SearchModal from './components/SearchModal.vue'

export default {
	name: 'App',
	components: {
		Header, SearchModal
	}
}
</script>

<style lang="scss">
@import 'assets/css/bootstrap-grid.min';
@import 'assets/css/style';
</style>