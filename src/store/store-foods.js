import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from '../boot/firebase'
import { showMessage } from '../functions/function-show-toast'

const state = {
	foods: {},
	// we get all tasks from firebase DataBase

/* CHANGE FORMAT DATA DESIGN in order to set it in our database */  
/* unique user id from firebase console */
/*         'Ho0seSIzGyZ2kXiB8cXxZT6WKC02' : {
'ID1': {               
	name: 'Go to shop',
	completed: false,
	dueDate: '2021/01/24',
	dueTime: '13:00'
},
'ID2': {
	name: 'Get bananas',
	completed: false,
	dueDate: '2021/02/08',
	dueTime: '10:30'
},
'ID3': {
	name: 'Get apples',
	completed: false,
	dueDate: '2021/10/1',
	dueTime: '21:00'
}
} */	// NOTE******** Sample for json import file below

/* 	"Jiky1rVYj4ZvWId33jWXo3zNweI3": {
		'id1': {
			name: 'Burger',
			description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
			imageUrl: 'https://i.imgur.com/0umadnY.jpg',
			rating: 4
		},
		'id2': {
			name: 'Pizza',
			description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
			imageUrl: 'https://i.imgur.com/b9zDbyb.jpg',
			rating: 5
		},
		'id3': {
			name: 'Sprouts',
			description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
			imageUrl: 'https://i.imgur.com/RbKjUjB.jpg',
			rating: 1
		}	
	} */
}

const mutations = {
	deleteFood(state, id) {
		Vue.delete(state.foods, id)
	},
	addFood(state, payload) {
		Vue.set(state.foods, payload.id, payload.food)
	},
	updateFood(state, payload) {
		Object.assign(state.foods[payload.id], payload.updates)
	},
	clearFoodsObject(state) {
		state.foods = {}
		//console.log('cleared foods: ', state.foods);
	}
}

const actions = {
	deleteFood({ dispatch }, id) {
		dispatch('fbDeleteFood', id)
	},
	addFood({ dispatch }, food) {
		let newId = uid()
		let payload = {
			id: newId,
			food: food
		}
		dispatch('fbAddFood', payload)
	},
	updateFood({ dispatch }, payload) {
		dispatch('fbUpdateFood', payload)
	},
	fbDeleteFood({}, foodId) {
		let userId = firebaseAuth.currentUser.uid
		let foodRef = firebaseDb.ref('foods/' + userId + '/' + foodId)

		foodRef.remove(error => {
            if (error) {
                showMessage(error.message)
            }
            else {
				//console.log('food deleted from db');
            }            
        })
	},
	fbAddFood({}, payload) {
		//console.log(payload);
	// set up reference where we want to add new task to
	let userId = firebaseAuth.currentUser.uid // database user id
// OVERRIDING user's id in order to test security rules from database
		//userId = "NaHRqhzQ42NSVGhMfHq6Sv8RdWw1"		
	let foodRef = firebaseDb.ref('foods/' + userId + '/' + payload.id ) // set up the ref
// use set method to write in database
		foodRef.set(payload.food, error => {
			if (error) {
				showMessage(error.message)
			}
			else {
				// food added
			}
		})
	},
	fbUpdateFood({}, payload) {
		let userId = firebaseAuth.currentUser.uid
		let foodRef = firebaseDb.ref('foods/' + userId + '/' + payload.id)
	 // update method
		foodRef.update(payload.updates, error => { // we pass in "updates" because that is what we are sending from editTask Component as a payload
			if (error) {
				showMessage(error.message)
			}
			else {
				//console.log('food updated');
			}
			
		})			
	},
	fbReadFoods({ commit }) {
		//console.log('reading foodsData from firebase');
        //console.log(firebaseAuth.currentUser); // get current user info
		
		let userId = firebaseAuth.currentUser.uid
// OVERRIDING user's id in order to test security rules from database
		//userId = "NaHRqhzQ42NSVGhMfHq6Sv8RdWw1"		
			// setting ref in order to read data from that node
		let userFoods = firebaseDb.ref('foods/' + userId)

	// initial check for data (in order to see error in console when trying to access another users data)
		//once method will get fired once listenind to 'value' event which will try to get values from the reference we set up before.
		userFoods.once('value', snapshot => {
			//get values (foods in this case)
		}), error => {
			showMessage(error.message);
		}
		
// HOOK 
	// child added (this hook is also fired when we first connect to the database. When we first connect to this node(uid) this child added hook will be fired)
				// Will be triggered when we add a food as well
		userFoods.on('child_added', snapshot => {
			//console.log('snapshot from child added hook: ', snapshot);
			// we need to call val() method in order to get the data or value from the snapshot
			let food = snapshot.val()
			//console.log('food is: ', food);

			// set a payload in order to add this food to our state.foods object
			let payload = {
				id: snapshot.key,
				food: food
			}
		// commit mutation to add task with payload above
			commit('addFood', payload)
		})
	// child changed
		userFoods.on('child_changed', snapshot => {
			//console.log('snapshot from child added hook: ', snapshot);
			let food = snapshot.val()
			//console.log('food is: ', food);

			// set a payload in order to update food
			let payload = {
				id: snapshot.key,
				updates: food
			}
		// commit mutation to update food
			commit('updateFood', payload)
		})
	// child removed
		userFoods.on('child_removed', snapshot => {
			let foodId = snapshot.key
			
			// now we commmit the mutation
			commit('deleteFood', foodId)
		})  			
	}
}

const getters = {
	foods: (state) => {
		return state.foods
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}