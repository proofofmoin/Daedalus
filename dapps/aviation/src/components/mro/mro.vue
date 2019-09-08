<template>
  <div class="container-wide">
    <evan-loading v-if="loading"></evan-loading>
    <section class="white-box border-smooth rounded" v-for="plane in planes" v-bind:key="plane.msn+plane.parts.length">
      <div class="header" style="display: flex; justify-content: space-between;">
        <h3 class="m-0 font-weight-semibold">{{plane.model}}</h3>
        <h3 class="m-0 font-weight-semibold">{{plane.msn}}</h3>
      </div>

      <section class="content part" v-for="part in plane.parts" v-bind:key="part.address">
        <div style="display: flex; justify-content: space-between;">
          <h4 class="m-0 font-weight-semibold">{{part.type}}</h4>
          <h4 class="m-0 font-weight-semibold">{{part.model}}</h4>
        </div>
        <p>{{ $t('aviate.planes.mro.until', { until: part.goodUntil } ) }}</p>        
        <div class="text-right">
          <button
            type="submit"
            class="btn btn-primary btn-rounded"
            :disabled="maintaining"
            @click="maintain(part.address)"
          >
            {{ $t('aviate.dispatcher.maintain', { part: part.type } ) }}
            <div v-if="loading" class="spinner-border spinner-border-sm text-secondary ml-3"></div>
            <i class="mdi mdi-arrow-right label ml-3" v-else></i>
          </button>
        </div>
      </section>
    </section>
    <section v-if="planes.length === 0 && !loading" style="text-align: center;">
      <strong>{{ 'aviate.planes.mro.nothing' | translate }}</strong>
    </section>
  </div>
</template>

<script lang="ts">
import RootComponent from "./mro";
export default RootComponent;
</script>

<style lang="scss" scoped>
@import "./mro";
</style>