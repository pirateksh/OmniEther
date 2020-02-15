const routes = require('next-routes')(); // require statement here returns a function thus a parenthesis.

routes
	.add({
		name: 'createRootFund',
		pattern: '/factory/rootFund/new',
		page: '/factory/rootFund/new'
	})
	.add('/funds/requests', '/funds/requests')
	.add({  
		name: 'fundDetails',
		pattern: '/funds/:contractAddress',
		page: '/funds/details'
	})
	.add({  
		name: 'getFundRequestsByChild',
 		pattern: '/funds/:contractAddress/requests/byChild',
  		page: '/funds/requests/byChild'
	})
	.add({  
		name: 'getFundRequestsByManager',
 		pattern: '/funds/:contractAddress/requests/byManager',
  		page: '/funds/requests/byManager'
	})
	.add({  
		name: 'getChildFunds',
 		pattern: '/funds/:contractAddress/children',
  		page: '/funds/children'
	})
	.add({  
		name: 'withdrawTokens',
 		pattern: '/funds/:contractAddress/children',
  		page: '/funds/children'
	})
	.add({
		name:'graphVis',
		pattern:'/graph-vis/graph',
		page:'/graph-vis/graph'
	});
	
	

module.exports = routes;


/*
	### EXAMPLE ###
	// Adding new route mapping
	routes
		.add('/campaigns/new', '/campaigns/new') // Added before as :address was taking 'new'RL.
		.add('/campaigns/:address', '/campaigns/show')
		.add('/campaigns/:address/requests', '/campaigns/requests/index')
		.add('/campaigns/:address/requests/new', '/campaigns/requests/new');
	// : represents wildcard
	// arg1: the new route
	// arg2: What component do we need to show.
*/


// module.exports = routes().add({
//   name: 'fundDetails',
//   pattern: '/funds/:contractAddress',
//   page: '/funds/details'
// });