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
          "placeholder": "Seriennummer",
          "error": "Bitte eine Seriennummer angeben!",
        },
        "planeModel": {
          "label": "Model",
          "placeholder": "z.B. A320",
          "error": "Bitte ein Model angeben!",
        },
        "engineModel": {
          "label": "Model",
          "placeholder": "z.B. ",
          "error": "Bitte ein Model angeben!",
        },
        "engineGoodUntil": {
          "label": "Auslaufdatum",
          "placeholder": "z.B. 2019-01-02",
          "error": "Bitte ein Auslaufdatum angeben!",
        },
        "landingGearModel": {
          "label": "Model",
          "placeholder": "z.B. ",
          "error": "Bitte ein Model angeben!",
        },
        "landingGearGoodUntil": {
          "label": "Auslaufdatum",
          "placeholder": "z.B. 2019-01-02",
          "error": "Bitte ein Auslaufdatum angeben!",
        }
      },
      "mro": {
        "nothing": "Im Moment gibt es nichts zum reparieren oder ersetzen",
        "until": "Abgelaufen am: {until}"
      }
    },
    "alias": {
      "desc": "Nutzername des neuen Kontakts",
      "error": "Bitte geben Sie einen Alias an!",
      "title": "Alias"
    },
    "breadcrumbs": {
      "planes": "Flugzeuge",
      "newplane": "Neues Flugzeug",
      "mro": "Wartung und Reparatur",
      "aviate": "Daedalus",
    },
    "content": "Herzlichen Glückwunsch {alias}, Sie haben erfolreich Ihre Vue Beispielanwendung erstellt.",
    "content-test": "Neue daten: {test}",
    "dispatcher": {
      "save": "Alias speichern",
      "new-plane": "Neues Flugzeug erstellen",
      "maintain": "{part} reparieren"
    },
    "header": {
      "new-plane": "Erstelle ein neues Flugzeug"
    }
  }
}
/* tslint:enable */;
