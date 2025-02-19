const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    video: false,
    reporterOptions: {
        charts: true,
        reportPageTitle: "Cypress Inline Reporter",
        embeddedScreenshots: true,
        inlineAssets: true //Adds the asserts inline
    },
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
            return require("./cypress/plugin/index.js")(on, config);
        },
        chromeWebSecurity: false,
        baseUrl: 'https://event.bintangpelajar.com',
    }
});
