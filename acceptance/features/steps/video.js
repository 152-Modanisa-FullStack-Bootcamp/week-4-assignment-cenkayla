const {Given, When, Then} = require("cucumber");
const openUrl = require("../support/action/openUrl");
const waitForSelector = require("../support/action/waitForSelector");
const checkElementExists = require("../support/check/checkElementExists");
const checkUrlContains = require("../support/check/checkUrlContains")
const assert = require('assert').strict;

Given("that User goes to Video Site Project's HomePage", async function () {
    await openUrl.call(this, "/")
});

When("page is loaded", async function () {
    await waitForSelector.call(this, '.home')
});

Then("User can see some of videos' title like", async function (arr) {
    const selector = ".card"

    for (let [videoName] of arr.rawTable) {
        let a = await this.page.$$eval (
            selector,
             async (items, videoName) => {
                const video = items.
                find(item => item.querySelector(".item").textContent === videoName)
            
                return !!video
            },
            videoName 
        )
        assert.strictEqual(a, true)
    }
});

Given("that User is on Video Site Project's HomePage", async function () {
    await openUrl.call(this, "/")
    await checkElementExists.call(this, ".favorites", false)
});

When(/^User clicks "([^"]*)" video$/, async function (videoName) {
    const selector = ".card"

    this.videoId = await this.page.$$eval(
        selector,
        async (items, videoName) => {
            const video = items
                .find(item => item.querySelector(".item").textContent === videoName)
            const image = video.querySelector("#image")
            const { id } = video.dataset
            await image.click()
            return id
        },
        videoName
    );
});

Then("User should see watch url correctly", async function () {
    const not = false
    await checkUrlContains.call(this, not, `/watch?id=${this.videoId}`)
});


When(/^User hovers "([^"]*)" video$/, async function (videoTitle) {
    const selector = ".card"

    videoId = await this.page.$$eval(
        selector,
        async (items, videoTitle) => {
            const video = items
                .find(item => item.querySelector(".item").textContent === videoTitle)
            const { id } = video.dataset
            return id
        },
        videoTitle
    );
    const imgSelector = await this.page.$(`div[data-id="${videoId}"]`)
    await imgSelector.hover()
});


Then("User should see hovered image", async function () {
    const videos = await this.page.$$(".card")
    let isHovered = false

    for (let video of videos) {
        let videoImg = await video.$("#image")
        const imageUrl = await (await videoImg.getProperty('src')).jsonValue()
        if (imageUrl.includes("hover")){
            isHovered = true
        }
    }
    assert.strictEqual(isHovered, true)
});
