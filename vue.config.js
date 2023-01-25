const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    publicPath: '/vue-profile',
    transpileDependencies: true,
    lintOnSave: false,
    outputDir: 'dist',
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    },
})

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/imports.styl'),
            ],
        })
}