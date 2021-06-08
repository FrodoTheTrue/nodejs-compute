// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Sends an instance creation request to GCP and waits for it to complete.
 *
 * @param {string} projectId - ID or number of the project you want to use.
 * @param {string} zone - Name of the zone you want to check, for example: us-west3-b
 * @param {string} instanceName - Name of the new machine.
 * @param {string} machineType - Machine type you want to create in following format:
 *    "zones/{zone}/machineTypes/{type_name}". For example:
 *    "zones/europe-west3-c/machineTypes/f1-micro"
 *    You can find the list of available machine types using:
 *    https://cloud.google.com/sdk/gcloud/reference/compute/machine-types/list
 * @param {string} sourceImage - Path the the disk image you want to use for your boot
 *    disk. This can be one of the public images
 *    (e.g. "projects/debian-cloud/global/images/family/debian-10")
 *    or a private image you have access to.
 *    You can check the list of available public images using:
 *    $ gcloud compute images list
 * @param {string} networkName - Name of the network you want the new instance to use.
 *    For example: global/networks/default - if you want to use the default network.
 */
function main(
  projectId,
  zone,
  instanceName,
  machineType = 'n1-standard-1',
  sourceImage = 'projects/debian-cloud/global/images/family/debian-10',
  networkName = 'global/networks/default'
) {
  // [START compute_instances_create]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const zone = 'europe-central2-b'
  // const instanceName = 'YOUR_INSTANCE_NAME'
  // const projectId = 'YOUR_PROJECT_ID';
  // const machineType = 'n1-standard-1';
  // const sourceImage = 'projects/debian-cloud/global/images/family/debian-10';
  // const networkName = 'global/networks/default';

  const compute = require('@google-cloud/compute');
  const compute_protos = compute.protos.google.cloud.compute.v1;

  async function createInstance() {
    const instancesClient = new compute.InstancesClient({fallback: 'rest'});

    const attachedDisk = new compute_protos.AttachedDisk();
    const initializeParams = new compute_protos.AttachedDiskInitializeParams();

    initializeParams.diskSizeGb = '10';
    initializeParams.sourceImage = sourceImage;

    attachedDisk.initializeParams = initializeParams;
    attachedDisk.autoDelete = true;
    attachedDisk.boot = true;
    attachedDisk.type = compute_protos.AttachedDisk.Type.PERSISTENT;

    const networkInterface = new compute_protos.NetworkInterface();
    networkInterface.name = networkName;

    // Collecting all the information into the Instance object
    const instance = new compute_protos.Instance();
    instance.name = instanceName;
    instance.disks = [attachedDisk];
    instance.machineType = `zones/${zone}/machineTypes/${machineType}`;
    instance.networkInterfaces = [networkInterface];

    console.log(`Creating the ${instanceName} instance in ${zone}...`);

    const operation = await instancesClient.insert({
      instanceResource: instance,
      project: projectId,
      zone,
    });

    console.log(operation);
    console.log(JSON.stringify(operation));

    if (operation[0].status === 'RUNNING') {
      const operationClient = new compute.ZoneOperationsClient({
        fallback: 'rest',
      });

      await operationClient.wait({
        operation: operation[0].name,
        project: projectId,
        zone: operation[0].zone.split('/').pop(),
      });
    }

    console.log('Instance created.');
  }

  createInstance();
  // [END compute_instances_create]
}

main(...process.argv.slice(2));