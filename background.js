browser.runtime.onInstalled.addListener(function () {
    browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.url.includes('.smartschool.be')) {
            browser.browserAction.enable(tabId);
        }
    });
});