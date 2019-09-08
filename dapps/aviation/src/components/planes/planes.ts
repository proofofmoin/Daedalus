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

// vue imports
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import { Prop, Model } from "vue-property-decorator";

// evan.network imports
import {
  EvanComponent,
  EvanForm,
  EvanFormControl
} from "@evan.network/ui-vue-core";
import * as bcc from "@evan.network/api-blockchain-core";
import * as dappBrowser from "@evan.network/ui-dapp-browser";

interface AliasFormInterface extends EvanForm {
  accountId: EvanFormControl;
  alias: EvanFormControl;
  email: EvanFormControl;
  emailInvite: EvanFormControl;
  eve: EvanFormControl;
  tags: EvanFormControl;
}

@Component({})
export default class PlanesComponent extends mixins(EvanComponent) {
  /**
   * show a loading symbol
   */
  loading = true;
  data = {
    model: "",
    msn: "",
    engine: ""
  };
  planes = [];

  /**
   * Load runtime from current scope and start using it...
   */
  async created() {
    const runtime = (<any>this).getRuntime();

    // grap all saved planes
    const createdPlanes =
      (await runtime.profile.getBcContracts("planes.evan")) || {};
    delete createdPlanes.cryptoInfo;

    const planeAddresses = Object.keys(createdPlanes);
    console.log("Planes: ", planeAddresses);
    if (planeAddresses.length < 1) {
      this.loading = false;
      return;
    }

    let planePromises = planeAddresses.map(address => {
      return (new bcc.DigitalTwin(runtime, {
        accountId: runtime.activeAccount,
        address: address,
        containerConfig: null
      }))
        .getEntry("data")
        .then(container => {
          return Promise.all([
            container.value.getEntry("model"),
            container.value.getEntry("msn"),
            container.value.getEntry("engine").catch(err => '')
          ]);
        })
        .then(([model, msn, engine]) => {
          return { model: model, msn: msn, engine };
        });
    });

    this.planes = await Promise.all(planePromises);
    // await Promise.all(this.planes.reduce((all, current) => all.concat(current), []));
    console.log(this.planes);

    this.loading = false;
  }
}
