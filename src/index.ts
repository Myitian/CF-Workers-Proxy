/**
 * HTTP Proxy to arbitrary URL with Cloudflare Worker.
 */

/**
 * Cloudflare Worker entrypoint
 */
if (typeof addEventListener === 'function') {
    addEventListener('fetch', (e: Event): void => {
        // work around as strict typescript check doesn't allow e to be of type FetchEvent
        const fe = e as FetchEvent
        fe.respondWith(proxyRequest(fe.request))
    });
}

async function proxyRequest(r: Request): Promise<Response> {
    const url = new URL(r.url)
    const targetUrl = url.protocol + '//furina.myitian.bid:81' + decodeURIComponent(url.pathname)
    return fetch(targetUrl, r)
}

interface FetchEvent extends Event {
    request: Request;
    respondWith(r: Promise<Response> | Response): Promise<Response>;
}
