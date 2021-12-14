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

'use strict';

function main(
  instanceGroupManager,
  project,
  region,
  regionInstanceGroupManagerDeleteInstanceConfigReqResource
) {
  // [START compute_v1_generated_RegionInstanceGroupManagers_DeletePerInstanceConfigs_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  The name of the managed instance group. It should conform to RFC1035.
   */
  // const instanceGroupManager = 'abc123'
  /**
   *  Project ID for this request.
   */
  // const project = 'my-project'
  /**
   *  Name of the region scoping this request, should conform to RFC1035.
   */
  // const region = 'us-central1'
  /**
   *  The body resource for this request
   */
  // const regionInstanceGroupManagerDeleteInstanceConfigReqResource = {}

  // Imports the Compute library
  const {RegionInstanceGroupManagersClient} =
    require('@google-cloud/compute').v1;

  // Instantiates a client
  const computeClient = new RegionInstanceGroupManagersClient();

  async function callDeletePerInstanceConfigs() {
    // Construct request
    const request = {
      instanceGroupManager,
      project,
      region,
      regionInstanceGroupManagerDeleteInstanceConfigReqResource,
    };

    // Run request
    const response = await computeClient.deletePerInstanceConfigs(request);
    console.log(response);
  }

  callDeletePerInstanceConfigs();
  // [END compute_v1_generated_RegionInstanceGroupManagers_DeletePerInstanceConfigs_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));