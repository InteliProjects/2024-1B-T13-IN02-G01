module.exports.routes = {
  // Views

  '/login': { view: 'pages/login', locals: { layout: 'layouts/no-nav' } },
  '/addAssembleLine': 'ViewController.isAdminPage',
  '/explorarManuais': 'ViewController.isAuthorizedPage',
  '/addTask': 'ViewController.isAdminPage',
  '/addFavorite': 'ViewController.isAuthorizedPage',
  '/assembleLine': 'ViewController.isAdminPage',
  '/meuProgresso': 'ViewController.isAuthorizedPage',
  '/assembleLine': 'ViewController.isAdminPage',
  '/adicionarFuncionario': 'ViewController.isAdminPage',
  '/admin': 'ViewController.isAdminPage',
  'GET /editarFuncionario/:id': 'UsersController.findOne',
  'GET /editarAssembleLine/:id': 'AssembleLinesController.findOne',
  '/manuaisAdmin': 'ViewController.isAdminPage',
  '/addManuaisAdmin': 'ViewController.isAdminPage',
  '/editAssembleLine': 'ViewController.isAdminPage',
  '/perfilFuncionario': 'ViewController.isAuthorizedPage',
  '/kanbanteste': 'ViewController.isAuthorizedPage',
  '/guia': 'ViewController.isAdminPage',
  '/editarHandbook/:id': 'HandbooksController.viewEdit',

  // API Endpoints

  'POST /api/login': 'AuthController.login',
  'GET /api/logout': 'AuthController.logout',
  'GET /': 'ViewController.home',

  'GET /users': 'UsersController.list',
  'GET /user': 'UsersController.userList',
  'POST /users': 'UsersController.create',
  'POST /users/update/:id': 'UsersController.updateUser',
  'POST /users/disable': 'UsersController.disableUsers',
  'POST /users/enable': 'UsersController.enableUsers',
  'GET /users/:id': 'UsersController.findOne',
  'DELETE /users/:id': 'UsersController.destroy',
  'GET /users/list': 'UsersController.list',

  'POST /assembleLines/update/:id':
    'AssembleLinesController.updatedAssembleLines',
  'GET /assembleLines': 'AssembleLinesController.list',
  'POST /assembleLines': 'AssembleLinesController.create',
  'DELETE /assembleLines/:id': 'AssembleLinesController.delete',

  'GET /handbooks': 'HandbooksController.list',
  'GET /handbooks/:id': 'HandbooksController.findOne',
  'POST /handbooks': 'HandbooksController.create',
  'PUT /handbooks/:id': 'HandbooksController.update',
  'DELETE /handbooks/:id': 'HandbooksController.destroy',

  'GET /tasks': 'TasksController.list',
  'GET /tasks/:id': 'TasksController.findOne',
  'POST /tasks': 'TasksController.create',
  'PUT /tasks/:id': 'TasksController.finished',

  'POST /favorites': 'FavoritesController.create',
  'POST /users/favorite': 'FavoritesController.favoriteHandbook',
  'GET /users/favorites': 'FavoritesController.listFavorites',

  'POST /additionalFiles': 'AdditionalFilesController.create',

  'GET /api/meuProgresso/pendentes': 'KanbanController.tasksUnfinished',
  'GET /api/meuProgresso/finalizados': 'KanbanController.tasksFinished',
};
