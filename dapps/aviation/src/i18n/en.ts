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

/* tslint:disable */
export default {
  "aviate": {
    "planes": {
      "createForm": {
        "msn": {
          "label": "MSN",
          "placeholder": "Serialnumber",
          "error": "Please enter a Serialnumber!",
        },
        "planeModel": {
          "label": "Aircraft model",
          "placeholder": "e.g. A320",
          "error": "Please enter a model!",
        },
        "engineModel": {
          "label": "Model",
          "placeholder": "e.G. ",
          "error": "Bitte ein Model angeben!",
        },
        "engineGoodUntil": {
          "label": "Expiry date",
          "placeholder": "e.g. 2019-01-02",
          "error": "Please enter an expiry date!",
        },
        "landingGearModel": {
          "label": "Model",
          "placeholder": "e.G. ",
          "error": "Bitte ein Model angeben!",
        },
        "landingGearGoodUntil": {
          "label": "Expiry date",
          "placeholder": "e.g. 2019-01-02",
          "error": "Please enter an expiry date!",
        }
      },
      "mro": {
        "nothing": "Currently nothing to repair/replace",
        "until": "Was good until: {until}"
      }
    },
    "alias": {
      "desc": "Username of the new contact",
      "error": "Please enter an alias!",
      "title": "Alias"
    },
    "breadcrumbs": {
      "planes": "Airline",
      "newplane": "Manufacturer",
      "mro": "Maintanance and Repair"
    },
    "content": "Congratulations {alias}, you've successfully created your Vue sample application.",
    "content-test": "New data: {test}",
    "dispatcher": {
      "save": "Saving Alias",
      "new-plane": "Create a new aircraft",
      "maintain": "Repair {part}"
    },
    "header": {
      "new-plane": "Create a new aircraft"
    }
  }
}
/* tslint:enable */;
