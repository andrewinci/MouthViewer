class userManager
{
    constructor(){
        this.users = [
            { id: 0, name: 'Daniel', image: require('../assets/images/child1.jpg'), age: '2' },
            { id: 1, name: 'Antonio', image: require('../assets/images/child2.jpg'), age: '10' },
          ]
        this.counter = 2
    }
    
    retrieveUsers(){
        return this.users;
    }

    addUser(user){
        user.id = this.counter++;
        this.users.push(user);
    }

    updateUser(user){
        let index = this.users.indexOf(user);
        console.log(index);
        this.users.splice(index, 1, user);
    }
}

export default UserManager = new userManager();