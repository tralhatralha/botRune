const puppeteer = require('puppeteer');
let links = [
  "https://oldschool.runescape.wiki/w/Commander_Zilyana", 
  "https://oldschool.runescape.wiki/w/General_Graardor", 
  "https://oldschool.runescape.wiki/w/Kree'arra",
  "https://oldschool.runescape.wiki/w/K'ril_Tsutsaroth",
  "https://oldschool.runescape.wiki/w/Corporeal_Beast",
  "https://oldschool.runescape.wiki/w/Vardorvis",
  "https://oldschool.runescape.wiki/w/Duke_Sucellus",
  "https://oldschool.runescape.wiki/w/The_Leviathan",
  "https://oldschool.runescape.wiki/w/The_Whisperer",
  "https://oldschool.runescape.wiki/w/Araxxor",
  "https://oldschool.runescape.wiki/w/Cerberus",
  
];

(async () => {
  // Lança o navegador
  const browser = await puppeteer.launch({ headless: "shell" }); // 'headless: false' abre o navegador visivelmente
  const page = await browser.newPage();
  for(let i = 0; i < links.length; i++){
    
  await page.goto(links[i], {timeout: 60000, waitUntil: 'domcontentloaded'})

  await page.waitForSelector('span[class="coins coins-pos"]');
 
  const goldHours = await page.evaluate(() => {
    const span = document.querySelector('.coins.coins-pos');
    return span ? span.textContent : 'Conteúdo não encontrado';
  });

  await page.waitForSelector('span[class="mw-page-title-main"]');
  
  const nameBoss = await page.evaluate(() => {
    const span = document.querySelector('.mw-page-title-main');
    return span ? span.textContent : 'Conteúdo não encontrado';
  });

  console.log(`O disgraçado do ${nameBoss} ta dando ${goldHours} por hora!`)
  }
  await browser.close();
})();



// coins coins-pos
// class="mw-page-title-main