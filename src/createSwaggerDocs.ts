import { deepMerge } from '@talkohavy/lodash';
import type { SwaggerRoute, SwaggerTag } from './types';

type CreateSwaggerApiDocsProps = {
  title?: string;
  baseUrl: string;
  routes: Array<SwaggerRoute>;
  extendedTags?: Array<SwaggerTag>;
  definitions?: any;
  responses?: any;
};

function createSwaggerApiDocs(props: CreateSwaggerApiDocsProps) {
  const { title, baseUrl, routes, extendedTags = [], definitions = undefined, responses = undefined } = props;

  const mergedRoutes = routes.reduce((acc, currentRoute) => deepMerge(acc, currentRoute), {});

  return {
    openapi: '3.1.0',
    info: {
      title,
      description:
        "This is a LuckyLove's API server manager. You can find out more about LuckyLove at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/). For this sample, you can use the api key special-key to test the authorization filters.",
      termsOfService: 'http://luckylove.co.il/terms/',
      contact: { name: 'API Support', url: 'http://www.luckylove.co.il/support', email: 'talkohavy@gmail.com' },
      license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0.html' },
      version: '1.0.6',
    },
    host: baseUrl,
    basePath: '',
    schemes: ['http', 'https'],
    tags: [
      ...extendedTags,
      {
        name: 'Rest',
        description: 'Everything about your REST service',
        externalDocs: { description: 'Find out more', url: 'http://swagger.io' },
      },
    ],
    paths: mergedRoutes,
    definitions,
    responses,
    // -----------------
    // Currently Unused:
    // -----------------
    parameters: {},
    securityDefinitions: {
      user_auth: {
        type: 'oauth2',
        authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
        flow: 'implicit',
        scopes: {
          // 'read:chats': 'read your chats',
          // 'write:chats': 'modify chats in your account',
        },
      },
    },
  };
}

export { createSwaggerApiDocs };
