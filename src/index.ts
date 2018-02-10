import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as views from 'koa-views';

const app = new Koa();
const router = new Router();

app.use(serve(__dirname + '/static'));

// Must be used before any router is used
app.use(views(__dirname + '/views', {
    extension: 'pug',
    map: {
        pug: 'pug',
    },
}));

app.use(async (ctx, next) => {
    ctx.state = {
        title: 'app',
    };

    await ctx.render('home', {
        user: 'John',
    });
});

router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes());

app.listen(3000);
