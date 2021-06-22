<template>
	<!--
	Awesome Exercise 4 - Firebase

	1) Create a new Firebase project called "Foods" and enable Email / Password authentication within Firebase //DONE
	2) Add the Firebase package to the project and create a boot file which makes the auth and database API's available within your app. Hint: you'll need to register a web app on Firebase //DONE
	3) Create an auth Vuex store file with empty state, mutations, actions & getters objects and import the Firebase Auth API // DONE
	4) Add the ability to register a user // DONE
	5) Add the ability to login a user // DONE
	6) Hide the Login button when the user is logged in // DONE
	7) Add a Logout button which only displays when the user is logged in. Log the user out when this is clicked // DONE
	8) Redirect the user to appropriate pages when they log in or log out // DONE
	9) Prevent the user from reaching the Foods page when not logged in // DONE
	10) Add some data for one of your users to the Realtime Database, based on the data in store-foods.js // DONE
	11) Add the ability to read the current user's food data from Firebase and display it within the app - whenever a food item is added, updated or deleted within Firebase
	12) Add the ability to write data to Firebase whenever a food item is added, updated or deleted within the app
	13) Ensure that multiple users can log in and log out without seeing another user's data in the app
	14) Add database rules to Firebase to ensure that each user can only read or write to their own data
	15) Display a nice error notification whenever there is an auth or database error
	16) Display the logged in user's email address within the logout button, e.g "Logout test@test.com"
	-->

  <q-page class="q-pa-lg">
  	<div class="row q-gutter-lg">

		<food 
			v-for="(food, key) in foods"
			:key="key"
			:food="food"
			:id="key" />

	    <button-add
	    	@click="showAddFoodModal = true" /> 

	    <q-dialog 
	    	v-model="showAddFoodModal">
			<modal-add-edit-food 
				@close="showAddFoodModal = false"
				type="add" />
        </q-dialog>
    
  	</div>
  </q-page>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
	  data() {
	  	return {
	  		showAddFoodModal: false
	  	}
	  },
	  computed: {
	  	...mapGetters('foods', ['foods'])
	  },
	  components: {
	  	'food' : require('components/Foods/Food.vue').default,
	  	'button-add' : require('components/Foods/ButtonAdd.vue').default,
	  	'modal-add-edit-food' : require('components/Foods/ModalAddEditFood.vue').default
	  }
	}
</script>