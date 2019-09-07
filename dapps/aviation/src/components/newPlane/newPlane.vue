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
  <div class="container-wide">
    <evan-loading v-if="loading"></evan-loading>
    <div class="white-box border-smooth rounded">
      <div class="header">
        <h3 class="m-0 font-weight-semibold">New plane</h3>
      </div>

      <div class="content">
        <div class="form-group">
          <label for="planeModel">{{ `aviate.planes.createForm.planeModel.label` | translate }} *</label>
          <input
            class="form-control"
            required
            id="planeModel"
            ref="planeModel"
            :placeholder="`aviate.planes.createForm.planeModel.placeholder` | translate"
            v-model="createForm.planeModel.value"
            :class="{ 'is-invalid' : createForm.planeModel.error }"
            @blur="createForm.planeModel.setDirty()"
          />
          <div class="invalid-feedback">{{ `aviate.planes.createForm.planeModel.error` | translate }}</div>
        </div>
        <div class="form-group">
          <label for="msn">{{ `aviate.planes.createForm.msn.label` | translate }} *</label>
          <input
            class="form-control"
            required
            id="msn"
            ref="msn"
            :placeholder="`aviate.planes.createForm.msn.placeholder` | translate"
            v-model="createForm.msn.value"
            :class="{ 'is-invalid' : createForm.msn.error }"
            @blur="createForm.msn.setDirty()"
          />
          <div class="invalid-feedback">{{ `aviate.planes.createForm.msn.error` | translate }}</div>
        </div>
        <div class="text-right">
          <button
            type="submit"
            class="btn btn-primary btn-rounded"
            :disabled="creating || !createForm.isValid"
            @click="newPlane()"
          >
            {{ `aviate.dispatcher.new-plane` | translate }}
            <div v-if="loading" class="spinner-border spinner-border-sm text-secondary ml-3"></div>
            <i class="mdi mdi-arrow-right label ml-3" v-else></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RootComponent from "./newPlane";
export default RootComponent;
</script>
