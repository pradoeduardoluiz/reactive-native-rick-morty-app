module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@domain': './src/domain',
          '@data': './src/data',
          '@presentation': './src/presentation',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
