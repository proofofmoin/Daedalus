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

import * as dispatchers from '../../dispatchers/registry';

@Component({})
export default class MROComponent extends mixins(EvanComponent) {
  /**
   * show a loading symbol
   */
  loading = true;
  data = {
    model: "",
    msn: "",
    parts: []
  };
  planes = [];

  maintaining = false;

  /**
   * Load runtime from current scope and start using it...
   */
  async created() {
    const runtime = (<any>this).getRuntime();
    dispatchers.maintain.watch(() => this.checkMaintaining())
    // grap all saved planes
    const createdPlanes =
      (await runtime.profile.getBcContracts("planes.evan")) || {};
    delete createdPlanes.cryptoInfo;

    const planeAddresses = Object.keys(createdPlanes);
    if (planeAddresses.length < 1) {
      this.loading = false;
      return;
    }

    let planePromises = planeAddresses.map(address => {
      return new bcc.DigitalTwin(runtime, {
        accountId: runtime.activeAccount,
        address: address,
        containerConfig: null
      })
        .getEntry("data")
        .then(container => {
          return Promise.all([
            container.value.getEntry("model"),
            container.value.getEntry("msn"),
            this.getPart(runtime, container, "engine"),
            this.getPart(runtime, container, "landingGear")
          ]);
        })
        .then(([model, msn, engine, landingGear]) => {
          return {
            model: model,
            msn: msn,
            address: address,
            parts: [engine, landingGear]
          };
        });
    });

    this.planes = await Promise.all(planePromises);
    const current = new Date();
    this.planes = this.planes
      .filter(plane => plane.parts.length > 0 && plane.parts.find(part => part.goodUntil))
      .map(plane => {
        plane.parts = plane.parts.filter(part => new Date(part.goodUntil) < current)
        return plane;
      })
      .filter(plane => plane.parts.length > 0)
    console.log(this.planes);

    this.loading = false;
  }

  maintain(partAddress) {
    let now = new Date();
    this.maintaining = true;
    dispatchers.maintain.start((<any>this).getRuntime(), {
      partAddress,
      goodUntil: new Date(now.setMonth(now.getMonth()+6))
    });
  }

  getPart(runtime, container, type: String) {
    return container.value
      .getEntry(type)
      .then(address => {
        return new bcc.DigitalTwin(runtime, {
          accountId: runtime.activeAccount,
          address: address,
          containerConfig: null
        })
          .getEntry("data")
          .then(container => {
            return Promise.all([
              container.value.getEntry("model"),
              container.value.getEntry("type"),
              container.value.getEntry("goodUntil")
            ]);
          })
          .then(([model, type, goodUntil]) => {
            return { model, type, goodUntil, address };
          })
          .catch(err => {
            return {};
          });
      })
      .catch(err => {
        return {};
      });
  }

  /**
   * Watch for dispatcher updates.
   */
  async checkMaintaining() {
    const runtime = (<any>this).getRuntime();
    const dispatcherInstances = await dispatchers.newPlaneDispatcher.getInstances(runtime);

    // if more than one dispatcher is running, block interactions
    if (dispatcherInstances.length > 0) {
      this.maintaining = true;
    } else {
      this.maintaining = false;
    }
  }
}
