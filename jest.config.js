const { defaults } = require('jest-config')
module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupFilesAfterEnv: ['<rootDir>/src/setupEnzyme.ts'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
}
