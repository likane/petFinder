var db = require ("../models");

//route keys:
//findAll
//findOne
//create
//update

//petFinder = user
module.exports = function(app){


//foundlist page
	// app.get('/found', function(request, response){
	// 	db.petFindeID.findAll({
	// 		where: {
	// 			found: true
	// 		}
	// 	}).then(function(foundPets){
	// 		db.petFindeID.findAll({
	// 			where: {
	// 				found: true
	// 			}
	// 		}).then(function(foundPets){
	// 			var handlebarObj = {
	// 				foundPets: foundPets
	// 			}
	// 			response.render('foundList',foundPets);		
	// 		})
	// 	})
	// })

	//login

	app.post('/login',
  passport.authenticate('local', { successRedirect: 'account',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

//foundlist page
	app.get('/found', function(request, response){
		db.petID.findAll({
			where: {
				found: true
			}
		}).then(function(foundPets){
			var handlebarObj = {
				foundPets: foundPets
			}
			response.render('foundlist', foundPets);
		})
	})

//lostlist page
	app.get('/post', function(request, response){
		db.petID.findAll({
			where: {
				found: false
			}
		}).then(function(foundPets){
			var handlebarObj = {
				lostPets: foundPets
			}
			response.render('lostList',foundPets);
		})
	})

//account page ?????
	app.get('/account/:id', function(request, response) {
		db.petFinder.findOne({
			id: request.params.id
		}).then(function(user) {
			var handlebarObj = {
				user: user
			}
			res.render('/profile', handlebarObj);
		})
	});


	// post to account user db "petFinder" DOES NOT INCLUDE PETID

	app.post('newAccountPage/create', function(request, response){
		db.petFinder.create({
			userName: request.body.userName,
			email: request.body.email,
			password: request.body.password,
			zipcode_user: request.body.zipcode_user,
		}).then(function(res){
			response.redirect('accountPage');
		});
	});

	//put to account user db "petFinder" DOES NOT INCLUDE PETID
	app.put('newAccountPage/update/:id', function(request, response){
		db.petFinder.update({
			userName: request.body.userName,
			email: request.body.email,
			password: request.body.password,
			zipcode_user: request.body.zipcode_user,
		}, {
			where:{
				id: request.params.id
			}
		}).then(function(res){
			response.redirect('accountPage');
		});
	});

	//GET route to get all users
	// app.get("/petFinder", function(req, res){
	// 	db.petFinder.findAll({}).then(function(dbpetFinder){
	// 		res.json(dbpetFinder);
	// 	});
	// });

	//GET route to get single user
	// app.get("/petFinder/:id", function(req, res){
	// 	db.petFinder.findOne({
	// 		where: {
	// 			id: req.params.id
	// 		}
	// 	}).then(function(dbpetFinder){
	// 		res.json(dbpetFinder);
	// 	});
	// });

	//POST route for saving a new user
	app.post("/petFinder", function(req, res){
		db.petFinder.create(req.body).then(function(dbpetFinder){
			res.json(dbpetFinder);
		});
	});

	//PUT route for updating a new user

	app.put("/petFinder", function(req, res) {
		db.petFinder.update(
			req.body,
			{
				where: {
					id: req.body.id
				}
			}).then(function(dbpetFinder) {
				res.json(dbpetFinder);
			});
		});
//END OF MODULE.EXPORTS

};