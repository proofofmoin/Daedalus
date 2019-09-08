import * as bcc from "@evan.network/api-blockchain-core";
import * as dappBrowser from "@evan.network/ui-dapp-browser";
import { Dispatcher, DispatcherInstance } from "@evan.network/ui";

const dispatcher = new Dispatcher(
  `aviate.${dappBrowser.getDomainName()}`,
  "maintainDispatcher",
  40 * 1000,
  "aviate.dispatcher.maintain"
);

dispatcher.step(async (instance: DispatcherInstance, formData: any) => {
  const runtime = instance.runtime;
  await new bcc.DigitalTwin(runtime, {
    accountId: runtime.activeAccount,
    address: formData.partAddress,
    containerConfig: null
  })
    .getEntry("data")
    .then(container => container.value.setEntry("goodUntil", formData.goodUntil));

  console.log(`Data updated`);
});

export default dispatcher;
