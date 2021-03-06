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

// !IMPORTANT!: Import this d.ts file within your vue tsconfig to fix "cannot find module" errors
// while importing vue files
declare module '*.vue' {
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  import Vuex from 'vuex';
  import vuexI18n from 'vuex-i18n';

  class EvanVue extends Vue {
    $i18n: vuexI18n;
    $router: VueRouter;
    $store: Vuex;
    $t: any;
  }

  export default EvanVue;
}

// declare module 'vue' {
//   import Vue from 'dist/vue.runtime.common.js';
//   import { EvanComponent } from '@evan.network/ui-vue-core';

//   export default EvanComponent;
// }
