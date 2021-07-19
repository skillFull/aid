const { body } = require('express-validator');


const checkUser = [

    body('username')
		.isEmail(), 


    body('password')
		.isStrongPassword({
			minSymbols: 0,
			pointsForContainingLower: 0,
			pointsForContainingNumber: 0,
			pointsForContainingUpper: 0,
			pointsPerRepeat: 0,
			pointsPerUnique: 0,
			pointsForContainingSymbol: 0
		}), 

 
    body('age')
		.isInt({
			min: 12,
			max: 115,
		}),

		body('name')
		.isString(),

		body('surname')
		.isString()
  ] ;

module.exports = checkUser;