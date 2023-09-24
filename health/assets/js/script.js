(async () => {
    const ko = await fetch("/health/lang/ko.json");
    const en = await fetch("/health/lang/en.json");

    document.documentElement.lang = navigator.language;

    await i18next.init({
        lng: navigator.language.split("-")[0],
        fallbackLng: "en",
        debug: true,
        resources: {
            ko: { translation: await ko.json() },
            en: { translation: await en.json() }
        }
    })

    document.title = i18next.t("title").replace("<emoji>", "").replace("</emoji>", "");

    document.querySelector("#title").innerHTML = i18next.t("title");
    document.querySelector("#desc").innerHTML = i18next.t("desc");
})();

function calcActualHeight() {
    if (["iPad", "iPhone", "iPod"].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", vh + "px");

        return true;
    } else {
        document.documentElement.style.setProperty("--vh", "1vh");

        return false;
    }
}

document.addEventListener("DOMContentLoaded", calcActualHeight);

window.addEventListener("load", calcActualHeight);
window.addEventListener("resize", calcActualHeight);