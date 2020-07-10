let puppeteer = require("puppeteer");
let { email, pwd, url } = require("./credentials.json");


async function fn() {
    // browser instance
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let pagesArr = await browser.pages();
    let page = pagesArr[0];
    await page.goto(url);
    await page.type("#input-1", email);
    await page.type("#input-2", pwd);
    await navigationFn("button[data-analytics='LoginPassword']", page);
    // ************************Dashboard*********************
    await page.waitForSelector("a.backbone.nav_link.js-dropdown-toggle.js-link.toggle-wrap", { visible: true });
    await page.click("a.backbone.nav_link.js-dropdown-toggle.js-link.toggle-wrap");
    await page.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']", { visible: true })
    await navigationFn("a[data-analytics='NavBarProfileDropDownAdministration']", page);
    // ******************Admin Page*************************
    await page.waitForSelector(".nav-tabs.nav.admin-tabbed-nav", { visible: true });
    let allTabs = await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await allTabs[1].click();
    await handleSinglePage(browser, page);
}
fn();

async function handleSinglePage(browser, tab) {
    await tab.waitForSelector(".backbone.block-center", { visible: true })
    let allCh = await tab.$$(".backbone.block-center");
    let AllLinkPArr = []
    for (let i = 0; i < allCh.length; i++) {
        let linkP = tab.evaluate(function (elem) { return elem.getAttribute("href") }, allCh[i]);
        AllLinkPArr.push(linkP);
    }
    // console.log(AllLinkPArr);
    let AllLinkArr = await Promise.all(AllLinkPArr);
    // console.log("```````````````````````````````");
    // console.log(AllLinkArr)
    // console.log(allCh.length);
    let allCPArr = []
    for (let i = 0; i < AllLinkArr.length; i++) {
        let nTab = await browser.newPage();
        let cUrl = "https://www.hackerrank.com" + AllLinkArr[i];
        let TabP = challengeHandler(nTab, cUrl)
        allCPArr.push(TabP);
    }
    await Promise.all(allCPArr);
    // Nxt page 
    let allLis = await tab.$$(".pagination ul li");
    let nxtBtn = allLis[allLis.length - 2];
    let isDisabled = tab.evaluate(function (elem) {
        return elem.getAttribute("class");
    }, nxtBtn)
    // console.log(isDisabled);
    if (isDisabled == "disabled") {
        return;
    } else {
        await Promise.all([nxtBtn.click(), tab.waitForNavigation({ waitUntil: "networkidle0" })]);
        await handleSinglePage(browser, tab);
    }

}
async function challengeHandler(tab, url) {
    await tab.goto(url);
    await handleSaveDialogBox("#confirm-modal", tab);
    await tab.waitForSelector("li[data-tab='moderators']", { visible: true });
    await navigationFn("li[data-tab='moderators']", tab);
    // await Promise.all([tab.click(), tab.waitForNavigation({ waitUntil: "networkidle0" })]);
    // await Promise.all([tab.click("li[data-tab='moderators']"), tab.waitForNavigation({ waitUntil: "networkidle0" })]);
    await tab.waitForSelector("#moderator", { visible: true });
    await tab.type("#moderator", "Jasbir");
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");
    // let ft = Date.now() + 5000;
    // while (Date.now() < ft) {
    // }
    await tab.close();
}

async function navigationFn(selector, tab) {
    await Promise.all([tab.click(selector), tab.waitForNavigation({ waitUntil: "networkidle0" })]);
}

async function handleSaveDialogBox(selector, tab) {
    try {
        await tab.waitForSelector(selector, { visible: true, timeout: 10000 });
        // await tab.waitForSelector("#confirmBtn", { visible: true });
        await tab.click("#confirmBtn");
    } catch (err) {
        console.log("Data was saved NP:)");
        return;
    }

}