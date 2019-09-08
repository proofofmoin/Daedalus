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
    <div class="white-box border-smooth rounded" v-else>
      <div class="header">
        <h3 class="m-0 font-weight-semibold">{{ `aviate.header.new-plane` | translate }}</h3>
      </div>

      <div class="content">
        <div class="form-group">
          <label for="planeModel">{{ `aviate.planes.createForm.planeModel.label` | translate }} *</label>
          <select
            class="form-control"
            required
            id="planeModel"
            ref="planeModel"
            :placeholder="`aviate.planes.createForm.planeModel.placeholder` | translate"
            v-model="createForm.planeModel.value"
            :class="{ 'is-invalid' : createForm.planeModel.error }"
            @blur="createForm.planeModel.setDirty()"
          >
            <option value="A320">A320</option>
            <option value="A330">A330</option>
            <option value="A340">A340</option>
            <option value="A350">A350</option>
            <option value="A380">A380</option>
          </select>
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
        <h2>Engine</h2>
        <div class="form-group">
          <label for="msn">{{ `aviate.planes.createForm.engineModel.label` | translate }} *</label>
          <select
            class="form-control"
            required
            id="engineModel"
            ref="engineModel"
            :placeholder="`aviate.planes.createForm.engineModel.placeholder` | translate"
            v-model="createForm.engineModel.value"
            :class="{ 'is-invalid' : createForm.engineModel.error }"
            @blur="createForm.engineModel.setDirty()"
          >
            <option value="Rolls-Royce">Rolls-Royce</option>
            <option value="General Electric">General Electric</option>
            <option value="Pratt & Whitney">Pratt & Whitney</option>
          </select>
          <div class="invalid-feedback">{{ `aviate.planes.createForm.engineModel.error` | translate }}</div>
        </div>
        <div class="form-group">
          <label for="msn">{{ `aviate.planes.createForm.engineGoodUntil.label` | translate }} *</label>
          <input
            class="form-control"
            required
            id="engineGoodUntil"
            ref="engineGoodUntil"
            type="date"
            :placeholder="`aviate.planes.createForm.engineGoodUntil.placeholder` | translate"
            v-model="createForm.engineGoodUntil.value"
            :class="{ 'is-invalid' : createForm.engineGoodUntil.error }"
            @blur="createForm.engineGoodUntil.setDirty()"
          />
          <div class="invalid-feedback">{{ `aviate.planes.createForm.engineGoodUntil.error` | translate }}</div>
        </div>
        <h2>Landing Gear</h2>
        <div class="form-group">
          <label for="msn">{{ `aviate.planes.createForm.landingGearModel.label` | translate }} *</label>
          <select
            class="form-control"
            required
            id="landingGearModel"
            ref="landingGearModel"
            :placeholder="`aviate.planes.createForm.landingGearModel.placeholder` | translate"
            v-model="createForm.landingGearModel.value"
            :class="{ 'is-invalid' : createForm.landingGearModel.error }"
            @blur="createForm.landingGearModel.setDirty()"
          >
            <option value="Safran">Safran</option>
            <option value="Liebherr">Liebherr</option>
            <option value="Collins Aerospace">Collins Aerospace</option>
          </select>
          <div class="invalid-feedback">{{ `aviate.planes.createForm.landingGearModel.error` | translate }}</div>
        </div>
        <div class="form-group">
          <label for="msn">{{ `aviate.planes.createForm.landingGearGoodUntil.label` | translate }} *</label>
          <input
            class="form-control"
            required
            id="landingGearGoodUntil"
            ref="landingGearGoodUntil"
            type="date"
            :placeholder="`aviate.planes.createForm.landingGearGoodUntil.placeholder` | translate"
            v-model="createForm.landingGearGoodUntil.value"
            :class="{ 'is-invalid' : createForm.landingGearGoodUntil.error }"
            @blur="createForm.landingGearGoodUntil.setDirty()"
          />
          <div class="invalid-feedback">{{ `aviate.planes.createForm.landingGearGoodUntil.error` | translate }}</div>
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

