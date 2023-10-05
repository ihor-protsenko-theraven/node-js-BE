const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();


app.use(cors());
// Define your Shopify API URL and credentials
const shopifyApiUrl = 'https://039337-2.myshopify.com/admin/api/2023-10/products.json'; // Remove the credentials from the URL
const username = '0959d989713d086a06ce7fd15f2cfec7';
const password = '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';
const credentials = `${username}:${password}`;
// const shopifyAuthorizationHeader = 'Basic ' + Buffer.from(credentials).toString('base64');
const shopifyAuthorizationHeader = 'Basic MDk1OWQ5ODk3MTNkMDg2YTA2Y2U3ZmQxNWYyY2ZlYzc6c2hwYXRfOTY2Mzc4ZjI4OTJlMGU3ZmJhMjcwNzE1Yjg2MWZmMDY=';

app.use(express.json());

app.get('/shopify-data', async (req, res) => {
    try {
        // Make a GET request to the Shopify API using axios
        const response = await axios.get(shopifyApiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': shopifyAuthorizationHeader,
            },
        });

        // Extract the data from the Shopify API response
        const shopifyData = response.data.products;

        // Return the Shopify data to the frontend
        res.json(shopifyData);
    } catch (error) {
        console.error('Error fetching Shopify data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
