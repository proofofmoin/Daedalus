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
    engine: {
      type: '',
      model: '',
      goodUntil: '',
      requiresMaintenance: false
    }
  };
  planes = [];

  getDataFromDigitalTwin = async (address: string, entries: string[]) => {
    if (!address) {
      return entries.map(entry => '')
    }

    console.log(`fetching data from address '${address}'`);

    const runtime = (<any>this).getRuntime();

    return await (new bcc.DigitalTwin(runtime, {
      accountId: runtime.activeAccount,
      address: address,
      containerConfig: null
    }))
      .getEntry("data")
      .then(container => Promise.all(
        entries.map(entry => container.value.getEntry(entry).catch(err => ''))
      ))
  }

  loadPartData = (part) => this.getDataFromDigitalTwin(part, ['type', 'model', 'goodUntil']).then(
    ([type, model, goodUntil]) => ({type, model, goodUntil, requiresMaintenance: new Date(goodUntil) < new Date()})
  )

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

    let planePromises = planeAddresses.map(address =>
      this.getDataFromDigitalTwin(
        address,
        ['model', 'msn', 'engine', 'landingGear']
      ).then(async ([model, msn, engine, landingGear]) => ({
        model,
        msn,
        engine: await this.loadPartData(engine),
        landingGear: await this.loadPartData(landingGear),
      }))
    )

    this.planes = await Promise.all(planePromises);
    // await Promise.all(this.planes.reduce((all, current) => all.concat(current), []));
    console.log(this.planes);

    this.loading = false;
  }
}
