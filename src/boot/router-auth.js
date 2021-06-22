import { LocalStorage } from "quasar";

export default ({ router }) => { // we pass router to manipulate it
  
    router.beforeEach((to, from, next) => { // add hook beforeEach( fires before each navigation that user tries to do)
        let userIsLogged = LocalStorage.getItem('isUserLoggedIn')
        console.log('to: ', to);    // logout params
        console.log('from: ', from);

    // adding router Navigation Guards

        if( !userIsLogged && to.path !== '/auth' ) {
            // user not loggedIn go to login page
            next('/auth') 
        }
        else { // user loggedIn
            next() // go wherever
        }
    })
}
