const { sanitizeEntity } = require('strapi-utils');

module.exports = {

    async find(ctx) {

        let entities;
        const splitURL = ctx.request.url.split('=')

        if (splitURL.length === 2) {

            const token = await strapi.query('token').findOne({ token: splitURL[1]})
            const userTags = await strapi.query('tag').find({ id_in: token.user.tags })
            const allNotices = await strapi.services.notice.find()

            entities = allNotices.filter(notice => 
                notice.tags.map(tag => tag.id).some(noticeTagID => 
                    userTags.map(tag => tag.id).indexOf(noticeTagID) >= 0
                )
            )
            
        } else {

            if (ctx.query._q) {
                entities = await strapi.services.notice.search(ctx.query);
            } else {
                entities = await strapi.services.notice.find(ctx.query);
            }

        }
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.notice }));
    }

};

