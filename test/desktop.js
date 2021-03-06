'use strict'
/*
Copyright 2018 Mark Lee and contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const createDesktopFile = require('../src/desktop')
const fs = require('fs-extra')
const path = require('path')
const test = require('ava')
const util = require('./_util')

test('custom desktop template', t => {
  const desktopFilePath = path.join(t.context.tempDir.name, 'app.desktop')
  const desktopTemplatePath = path.join(__dirname, 'fixtures', 'custom.desktop.ejs')
  return createDesktopFile(t.context.tempDir.name, { name: 'app', desktopTemplate: desktopTemplatePath })
    .then(() => fs.pathExists(desktopFilePath))
    .then(exists => {
      t.true(exists, 'desktop file exists')
      return fs.readFile(desktopFilePath)
    }).then(desktopData => util.assertIncludes(t, desktopData.toString(), 'Comment=Hardcoded comment', 'uses custom template'))
})
