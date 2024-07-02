const fs = require('fs');
const axios = require('axios');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// API URL that returns the list of URLs for your sitemap
const apiUrl = 'https://api.lakshyacommerce.com/api/home/sitemapData';

// Base URL of your site
const baseUrl = 'https://www.lakshyacommerce.com/';

// Function to fetch URLs from the API
async function fetchUrlsFromApi() {
    try {
        // Fetch the data from the API
        const response = await axios.get(apiUrl);
        const urls = response.data; // Axios automatically handles JSON parsing

        // Assuming each URL object includes url, changefreq, and priority properties
        return urls.map(url => ({
            url: url.url,
            changefreq: url.changefreq || 'daily',  // Providing default values if not specified
            priority: url.priority || 1.0
        }));
    } catch (error) {
        console.error("Error fetching URLs from API:", error);
        return []; // Return an empty array to avoid further errors
    }
}

// Function to generate the sitemap
async function generateSitemap() {
    try {
        const links = await fetchUrlsFromApi();
        const sitemapStream = new SitemapStream({ hostname: baseUrl });
        const xmlString = await streamToPromise(Readable.from(links).pipe(sitemapStream)).then(data => data.toString());

        const outputPath = '/var/www/lakshya/next/public/sitemap.xml'; // Adjust this path as necessary
        fs.writeFile(outputPath, xmlString, (err) => {
            if (err) {
                console.error('Error writing sitemap:', err);
                return;
            }
            console.log('Sitemap generated successfully!');
        });
    } catch (e) {
        console.error('Error generating sitemap:', e);
    }
}

// Run the function
generateSitemap();
