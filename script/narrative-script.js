function narrativeStore(script, image, buttonName, buttonClick) {
    localStorage.setItem('script', script);
    localStorage.setItem('narrative-image', image);
    localStorage.setItem('narrative-buttonName', buttonName);
    localStorage.setItem('narrative-buttonClick', buttonClick);
}