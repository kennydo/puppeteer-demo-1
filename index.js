const express = require('express')
const puppeteer = require('puppeteer');
require("dotenv").config();
const app = express()
const PORT = process.env.PORT || 4000;
const http = require("http").Server(app);
const path = require("path");
const fs = require("fs").promises;
const cors = require("cors");
const TelegramBot = require('node-telegram-bot-api');
const { error } = require('console');

const io = require("socket.io")(http);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));


app.get('/', async function (req, res) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        ],
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();

  return res.send(200, { message: 'ok' });
});

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

