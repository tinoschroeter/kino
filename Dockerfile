# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY movie .

RUN npm install && npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS kino
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]

FROM node:16-alpine AS scraper

ENV NODE_ENV production

#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S scraper -u 1001

#USER scraper

WORKDIR /app
COPY scraper .

RUN npm install --only=production
CMD ["sleep", "10000"]
