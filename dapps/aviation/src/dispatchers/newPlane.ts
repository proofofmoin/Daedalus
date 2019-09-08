import * as bcc from "@evan.network/api-blockchain-core";
import * as dappBrowser from "@evan.network/ui-dapp-browser";
import { Dispatcher, DispatcherInstance } from "@evan.network/ui";

const dispatcher = new Dispatcher(
  `aviate.${dappBrowser.getDomainName()}`,
  "newPlaneDispatcher",
  40 * 1000,
  "aviate.dispatcher.new-plane"
);

const createTwinWithDescription = (runtime: any, description: any) => bcc.DigitalTwin.create(runtime, {
  accountId: runtime.activeAccount,
  description,
  containerConfig: {
    accountId: runtime.activeAccount,
    factoryAddress: "container.factory.evan"
  },
  factoryAddress: "index.factory.evan"
})

const createPart = async (runtime: bcc.Runtime, type: string, model: string, goodUntil: number) => {
  const twin = await createTwinWithDescription(
    runtime,
    {
      name: type,
      description: `${type} - ${model}`,
      author: 'Airbus',
      version: '0.1.0',
      dbcpVersion: 2
    }
  )

  const twinAddress = await twin.getContractAddress();

  console.log(`created new digital twin for part ${type} - ${model} at ${twinAddress}`);

  const { data } = await twin.createContainers({
    data: {}
  });

  await Promise.all([
    data.setEntry("type", type),
    data.setEntry("model", model),
    data.setEntry("goodUntil", goodUntil),
  ]);

  return twinAddress;
}

dispatcher.step(async (instance: DispatcherInstance, formData: any) => {
  const runtime = instance.runtime;

  const plane = await createTwinWithDescription(
    runtime,
    {
      name: "Plane",
      description: "An Airbus plane",
      author: "Airbus",
      version: "0.1.0",
      dbcpVersion: 2
    }
  )

  const address = await plane.getContractAddress();

  console.log(
    `created new digital twin plane with address "${address}"`
  );

  // create a container with default template
  const { data } = await plane.createContainers({
    data: {}
  });

  await Promise.all([
    data.setEntry("model", formData.planeModel),
    data.setEntry("msn", formData.msn),
    data.setEntry("engine", await createPart(runtime, "Engine", formData.engineModel, 1567930445)),
  ]);

  await runtime.profile.loadForAccount(runtime.profile.treeLabels.contracts);
  await runtime.profile.addBcContract('planes.evan', address, {});
  await runtime.profile.storeForAccount(runtime.profile.treeLabels.contracts);

  console.log(`Data was set`);
});

export default dispatcher;
