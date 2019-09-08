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
import { Prop } from "vue-property-decorator";

// evan.network imports
import { EvanComponent, EvanForm, EvanFormControl } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import * as dispatchers from '../../dispatchers/registry';

interface AliasFormInterface extends EvanForm {
  accountId: EvanFormControl;
  alias: EvanFormControl;
  email: EvanFormControl;
  emailInvite: EvanFormControl;
  eve: EvanFormControl;
  tags: EvanFormControl;
}

interface PlaneFormInterface extends EvanForm {
  planeModel: EvanFormControl;
  msn: EvanFormControl;
  engineModel: EvanFormControl;
  engineGoodUntil: EvanFormControl;
}

@Component({})
export default class NewPlaneComponent extends mixins(EvanComponent) {
  /**
   * show a loading symbol
   */
  loading = true;

  /**
   * Formular definition to handle form changes easily.
   */
  createForm: PlaneFormInterface = null;

  /**
   * Watch for dispatcher updates...
   */
  creatingWatcher = null;
  creating = false;

  /**
   * Load runtime from current scope and start using it...
   */
  async created() {
    const runtime = (<any>this).getRuntime();
    const addressBook = await runtime.profile.getAddressBook();

    this.createForm = (<PlaneFormInterface>new EvanForm(this, {
      planeModel: {
        value: "",
        validate: function(vueInstance: NewPlaneComponent, form: PlaneFormInterface) {
          return this.value.length !== 0;
        }
      },
      msn: {
        value: "",
        validate: function(vueInstance: NewPlaneComponent, form: PlaneFormInterface) {
          return this.value.length !== 0;
        }
      },
      engineModel: {
        value: "",
        validate: function(vueInstance: NewPlaneComponent, form: PlaneFormInterface) {
          return this.value.length !== 0;
        }
      },
      engineGoodUntil: {
        value: "",
        validate: function(vueInstance: NewPlaneComponent, form: PlaneFormInterface) {
          return this.value.length !== 0;
        }
      },
    }));

    // watch for updates
    this.creatingWatcher = dispatchers.newPlaneDispatcher.watch(() => this.checkCreating());
    this.checkCreating();

    // display content
    this.loading = false;
  }

  newPlane() {
    const engineGoodUntilDate = new Date(this.createForm.engineGoodUntil.value);

    dispatchers.newPlaneDispatcher.start((<any>this).getRuntime(), {
      planeModel: this.createForm.planeModel.value,
      msn: this.createForm.msn.value,
      engineModel: this.createForm.engineModel.value,
      engineGoodUntil: engineGoodUntilDate.getTime(),
    });
  }

  /**
   * Watch for dispatcher updates.
   */
  async checkCreating() {
    const runtime = (<any>this).getRuntime();
    const dispatcherInstances = await dispatchers.newPlaneDispatcher.getInstances(runtime);

    // if more than one dispatcher is running, block interactions
    if (dispatcherInstances.length > 0) {
      this.creating = true;
    } else {
      this.creating = false;
    }
  }
}
