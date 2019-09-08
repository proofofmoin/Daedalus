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

interface ReplaceFormInterface extends EvanForm {
  goodUntil: EvanFormControl;
}

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

  replacing = false;
  replaceForm: ReplaceFormInterface = null;

  /**
   * Load runtime from current scope and start using it...
   */
  async created() {
    const runtime = (<any>this).getRuntime();

    this.replaceForm = (<ReplaceFormInterface>new EvanForm(this, {
      goodUntil: {
        value: "",
        validate: function(vueInstance: MROComponent, form: ReplaceFormInterface) {
          return this.value.length !== 0;
        }
      }
    }));

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
            return { model, type, goodUntil };
          })
          .catch(err => {
            return {};
          });
      })
      .catch(err => {
        return {};
      });
  }
}
