/*
  Copyright (C) 2018-present evan GmbH.

  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3,
  as published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see http://www.gnu.org/licenses/ or
  write to the Free Software Foundation, Inc., 51 Franklin Street,
  Fifth Floor, Boston, MA, 02110-1301 USA, or download the license from
  the following URL: https://evan.network/license/

  You can be released from the requirements of the GNU Affero General Public
  License by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts
  of it on other blockchains than evan.network.

  For more information, please contact evan GmbH at this address:
  https://evan.network/license/
*/

<template>
  <div class="evan theme-evan">
    <evan-dapp-wrapper :routes="[ ]">
      <template slot="content">
        <evan-breadcrumbs
          :i18nScope="'aviate.breadcrumbs'"
          :enableReload="true">
        </evan-breadcrumbs>

        <evan-nav-tabs class="flex-shrink-0"
          :tabs="tabs"
          ref="navTabs">
        </evan-nav-tabs>

        <!-- <evan-dapp-wrapper-level-2>
          <template v-slot:content>
            <div class="w300 p-3">
              {{ 'aviate.sidebarcontent' | translate}}
            </div>
          </template>
        </evan-dapp-wrapper-level-2> -->

        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </template>
    </evan-dapp-wrapper>
  </div>
</template>

<script lang="ts">
  import RootComponent from './root';
  export default RootComponent;
</script>

<style lang="scss" scoped>
  @import './root';
</style>
