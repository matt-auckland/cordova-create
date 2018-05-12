/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

var path = require('path');
var fs = require('fs');
var shell = require('shelljs');
var os = require('os');

module.exports.tmpDir = function (subdir) {
    var dir = path.join(os.tmpdir(), 'e2e-test');
    if (subdir) {
        dir = path.join(dir, subdir);
    }
    if (fs.existsSync(dir)) {
        shell.rm('-rf', dir);
    }
    shell.mkdir('-p', dir);
    return dir;
};

// Add the toExist matcher.
beforeEach(function () {
    jasmine.addMatchers({
        'toExist': function () {
            return {
                compare: function (testPath) {

                    var result = {};
                    result.pass = fs.existsSync(testPath);

                    if (result.pass) {
                        result.message = 'Expected file ' + testPath + ' to exist.';
                    } else {
                        result.message = 'Expected file ' + testPath + ' to not exist.';
                    }

                    return result;

                }
            };
        }
    });
});
