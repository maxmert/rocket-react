export default function(html) {
    return (`<html><head><title>Isomorphic</title></head><body><section id="app">${html}</section><script type="text/javascript" src="/scripts/app.js"></script></body></html>`)
}
