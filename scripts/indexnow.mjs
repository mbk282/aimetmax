// Meldt pagina's van aimetmax.nl aan bij IndexNow: Bing (en via Bing ook
// DuckDuckGo, Copilot en ChatGPT search), Yandex, Seznam en Naver. Google doet
// niet mee met IndexNow; die leest de sitemap uit Search Console.
//
// Draaien NA een productie-deploy (Node 18+, geen extra pakketten nodig):
//   node scripts/indexnow.mjs                      alle URL's uit de live sitemap
//   node scripts/indexnow.mjs /kaarten /blog/slug  alleen deze paden
//   node scripts/indexnow.mjs --droog              laat alleen zien wat er gemeld zou worden
//
// De sleutel is bewust openbaar: IndexNow controleert hem via
// public/<sleutel>.txt op ons eigen domein. Dat bestand moet dus eerst live staan.
const KEY = "fd1d617e09720b82aca72b33f7b2a9e4";
const HOST = "aimetmax.nl";

async function main() {
  const args = process.argv.slice(2);
  const droog = args.includes("--droog");
  const paden = args.filter((a) => !a.startsWith("--"));

  let urls = paden.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`);
  if (urls.length === 0) {
    const res = await fetch(`https://${HOST}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap niet op te halen: ${res.status}`);
    const sitemap = await res.text();
    urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  }
  // Alleen eigen URL's; IndexNow weigert anders de hele lijst.
  urls = [...new Set(urls)].filter((u) => new URL(u).hostname === HOST);
  if (urls.length === 0) throw new Error("geen URL's gevonden om te melden");

  if (droog) {
    console.log(`Droog: ${urls.length} URL's, niets verstuurd.`);
    for (const u of urls) console.log(`  ${u}`);
    return;
  }

  const sleutelBestand = await fetch(`https://${HOST}/${KEY}.txt`);
  if (!sleutelBestand.ok || (await sleutelBestand.text()).trim() !== KEY) {
    throw new Error("sleutelbestand staat nog niet live: eerst deployen");
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  // 200 = geaccepteerd, 202 = geaccepteerd maar sleutel wordt nog gecontroleerd.
  console.log(`IndexNow: ${res.status} ${res.statusText} voor ${urls.length} URL's`);
  if (res.status >= 300) process.exit(1);
}

main().catch((e) => {
  console.error(`IndexNow mislukt: ${e.message}`);
  process.exit(1);
});
