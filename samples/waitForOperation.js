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
 * Waits for an operation to be completed. Calling this function will block until the operation is finished.
 * @param {string} projectId - ID or number of the project you want to use.
 * @param {Operation} operation - Operation instance you want to wait.
 */
function main(projectId, operation) {
  // [START compute_instances_operation_check]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const operation = { ... }

  const compute = require('@google-cloud/compute');
  const compute_protos = compute.protos.google.cloud.compute.v1;

  async function waitForOperation() {
    if (operation[0].status === compute_protos.Operation.Status.RUNNING) {
      const operationClient = new compute.ZoneOperationsClient({
        fallback: 'rest',
      });

      await operationClient.wait({
        operation: operation[0].name,
        project: projectId,
        zone: operation[0].zone.split('/').pop(),
      });
    }
  }

  waitForOperation();
  // [END compute_instances_operation_check]
}

main(...process.argv.slice(2));
