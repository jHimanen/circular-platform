require('dotenv').config()
const axios = require('axios')

const url = 'https://newsapi.org/v2/everything?' +
            'q=circular_economy&' +
            'from=2021-08-01&' +
            'sortBy=publishedAt&' +
            `apiKey=${process.env.NEWS_API_KEY}`

module.exports = async () => {
    console.log('Refreshing news data...')

    const { data } = await axios.get(url).catch(error => {
        console.log(error.message)
    })

    const articles = data.articles

    articles.forEach(article => {
        strapi.query('article').create({
            Title: article.title,
            Description: article.description,
            URL: article.url
        })
    })
    console.log('Done!')
}