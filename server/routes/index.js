// initialize
require('../module/cache')().init()



const 
	express = require('express'),
	articles = require('./articles'),
	classes = require('./classes'),
	login = require('./login'),
	uploadImage = require('./uploadImage')
	
	resourceRouter = express.Router(),
	apiRouter = express.Router()



// url                      type        description                       require Login

// /resource/articles        get         get all article                  false
// /resource/articles        put         create new article               true
// /resource/articles/13     get         get one article by id            false
// /resource/articles/13     post        update one article by id         true
// /resource/articles/13     delete      delete one article by id         true

// /resource/classes         get         get all classes                  false
// /resource/classes         put         create new class                 true
// /resource/classes/13      post        update class by id               true
// /resource/classes/13      delete      delete class by id               true

// /login                    post        login

resourceRouter.use((req, res, next) => {
	let method = req.method,
		user = req.session.user

	// verify permissions
	// if (process.env.NODE_ENV === 'production') {
		if (method == 'POST' || method == 'PUT' || method == 'DELETE') {
			if (!user) {
				res.end(JSON.stringify({
					code: 1,
					msg: 'limited authority'
				}), 'utf8')

				return
			}
		}
	// }

	next()
})

// /resource/articles
resourceRouter.get('/articles', articles.get)
resourceRouter.post('/articles', articles.post)

// /resource/articles/:id
resourceRouter.get('/articles/:id', articles.getOne)
resourceRouter.put('/articles/:id', articles.put)
resourceRouter.delete('/articles/:id', articles.delete)

// /resource/classes
resourceRouter.get('/classes', classes.get)
resourceRouter.post('/classes', classes.post)

// /resource/classes/:id
resourceRouter.put('/classes/:id', classes.put)



// /api/login
apiRouter.post('/login', login.login)

// /api/uploadImage
apiRouter.post('/uploadImage',uploadImage.post)
apiRouter.delete('/uploadImage',uploadImage.delete)


module.exports = {
	resource: resourceRouter,
	api: apiRouter
}
