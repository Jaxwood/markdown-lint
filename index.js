#!/usr/bin/env node
'use strict'
const fs = require('fs')
const FileHound = require('filehound')
let report = require('vfile-reporter')
let remark = require('remark')
let styleGuide = require('remark-preset-lint-markdown-style-guide')

FileHound.create()
  .paths(process.cwd())
  .ext('.md')
  .discard('node_modules')
  .find((err, files) => {
    if (err) {
      console.error(err)
    }
    let lintingErrors = files.map((file) => {
      return remark().use(styleGuide).processSync(fs.readFileSync(file))
    })
    console.log(report(lintingErrors))
  })
