FROM strapi/strapi

ENV DATABASE_HOST='circularprototype.zbjci.mongodb.net' \
    DATABASE_SRV=true \
    DATABASE_PORT=27017 \
    DATABASE_NAME='circular-platform' \
    DATABASE_USERNAME='admin' \
    DATABASE_PASSWORD='MVJVkG66vosguh6UkAwoa7dAq' \
    ADMIN_JWT_SECRET='0fc5cc98da188eaaaaffe3d2d9f6329e'

COPY . .

CMD [ "npm", "run", "develop" ]