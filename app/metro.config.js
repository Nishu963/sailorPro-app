const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const defaultResolveRequest = config.resolver.resolveRequest;
const appNodeModules = path.resolve(__dirname, 'node_modules');
const rootNodeModules = path.resolve(__dirname, '..', 'node_modules');

config.watchFolders = [path.resolve(__dirname, '..')];
config.resolver.nodeModulesPaths = [appNodeModules, rootNodeModules];
function resolvePackageDir(moduleName) {
  try {
    return path.dirname(require.resolve(`${moduleName}/package.json`, { paths: [appNodeModules, rootNodeModules] }));
  } catch (e) {
    return null;
  }
}

config.resolver.extraNodeModules = {
  react: resolvePackageDir('react') || path.join(appNodeModules, 'react'),
  'react-dom': resolvePackageDir('react-dom') || path.join(appNodeModules, 'react-dom'),
  'react-native': resolvePackageDir('react-native') || path.join(appNodeModules, 'react-native'),
  'react-native-web': resolvePackageDir('react-native-web') || path.join(appNodeModules, 'react-native-web'),
};

function resolveFromAppNodeModules(moduleName) {
  const directPackages = ['react', 'react-dom', 'react-native', 'react-native-web'];
  const matchingPackage = directPackages.find(
    (packageName) => moduleName === packageName || moduleName.startsWith(`${packageName}/`),
  );

  if (!matchingPackage) {
    return null;
  }

  return {
    filePath: require.resolve(moduleName, { paths: [appNodeModules, rootNodeModules] }),
    type: 'sourceFile',
  };
}

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const appResolvedModule = resolveFromAppNodeModules(moduleName);

  if (appResolvedModule) {
    return appResolvedModule;
  }

  if (moduleName === 'memoize-one') {
    return {
      filePath: path.resolve(__dirname, './src/vendor/memoize-one.js'),
      type: 'sourceFile',
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
