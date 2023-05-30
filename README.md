# EPCR Champions Cup / Challenge Cup Match Results Scraper

This repo holds a small scraper to be run in Firefox on https://www.epcrugby.com/champions-cup/matches/ and https://www.epcrugby.com/challenge-cup/matches/ 

It also holds scraped EPCR Champions Cup results from 2017/2018 to 2022/2023 in JSON format.

If you scrape older results or Challenge Cup results, be a good citizen and PR back to this repo so others don't have to scrape them.

## Usage

just copy the contents of [epcr-scraper.js](./ecpr-scraper.js) into your browser console. Run the function and it will output the results in the console.

Note that it will occasionally pull in results for previous years or previous requests and append them after the results for the year you're looking at. I think it does this because of how the epcrugby website is paging it's results.
