const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and monorepo roots
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files in monorepo (e.g. packages/shared)
config.watchFolders = [monorepoRoot];

// 2. Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;