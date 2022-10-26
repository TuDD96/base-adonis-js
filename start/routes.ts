/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
// const Helpers = use('app/Helpers/Helpers')
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('/test-mail', 'Api/TasksController.sendMail')
Route.get('/test-queue', 'Api/TasksController.testQueue')

Route.post('import', 'Api/ImportController.import')
Route.post('queueJob', 'Api/ImportController.queueJob')

Route.post('insert-film/:page', 'Api/FilmController.insertFilm')
Route.group(() => {
  // users
  Route.group(() => {
    Route.get('/', 'Api/UsersController.index')
  }).prefix('/users')

  // tasks
  Route.group(() => {
    Route.get('/', 'Api/TasksController.index')
    Route.post('/', 'Api/TasksController.store')
    Route.get('/:id', 'Api/TasksController.show')
    Route.put('/:id', 'Api/TasksController.update')
    Route.delete('/:id', 'Api/TasksController.delete')
    // resouces route
    // Route.resource('/', 'Api/TasksController')
  }).prefix('/tasks')
}).middleware(['auth'])

// authencation
Route.post('/login', 'Api/AuthController.login')
Route.post('/register', 'Api/AuthController.register')
