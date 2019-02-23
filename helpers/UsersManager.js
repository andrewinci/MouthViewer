class userManager
{ 
    constructor(){
        this.users = [
            { name: 'Baby one', image: require('../assets/images/child1.jpg') },
            { name: 'Baby two', image: require('../assets/images/child2.jpg') },
          ]
    }
    
    retrieveUsers(){
        return this.users;
    }

    addUser(user){
        this.users.push(user);
    }

}

export default UserManager = new userManager();