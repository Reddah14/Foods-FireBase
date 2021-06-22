import { LocalStorage } from "quasar";

export default ({ router }) => { // we pass router to manipulate it

  
  router.beforeEach((to, from, next) => { // add hook beforeEach( fires before each navigation that user tries to do)
    let userIsLogged = LocalStorage.getItem('isUserLoggedIn')

    console.log('to: ', to);
    console.log('from: ', from);
    
        next() // needed for app to start working again
    })

}
