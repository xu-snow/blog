var 
    path = require('path'),
    http = require('http'),
    express = require('express'),
    session = require('express-session'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    
    // Vue-Router HTML5 History mode
    // http://router.vuejs.org/zh-cn/essentials/history-mode.html
    history = require('connect-history-api-fallback'),  

    router = require('./routes/index')

const 
    NODE_ENV = process.env.NODE_ENV === 'production',
    port = NODE_ENV ? 80 : 3000



app = express()

app.use(history())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json({'limit': '10mb'}))
app.use(bodyParser.urlencoded({'limit': '10mb', extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// set seeion
app.use(session({
    secret: 'LinDong secret', 
    saveUninitialized: false, 
    resave: false,
    cookie: {httpOnly: true}
}))

// development Access-Control-Allow-Origin
if (!NODE_ENV) {
    app.all('*', function(req, res, next){
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
        res.header('Access-Control-Allow-Credentials',"true")
        res.header("Content-Type", "application/json;charset=utf-8");
        // if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
         next()
        
    })
}




// set route
app.use('/resource', router.resource)
app.use('/api', router.api)



app.listen(port, () => {console.log('Server created to port:' + port)})
