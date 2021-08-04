const { sanitizeEntity } = require('strapi-utils');

module.exports = {

  async find(ctx) {
    console.log('Request reached controller')
    await strapi.config.functions.news()

    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }
    console.log('Returning data...')
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.article }));
  },
};
