function getCachedImage(url) {
    if (spriteCache[url]) {
        return spriteCache[url];
    }
    const pokeImg = new Image();
    pokeImg.src = url;
    spriteCache[url] = pokeImg;
    return pokeImg;
}