const auth = {
    isAuthenticated: false,
    user: {},
    async authenticate(username, password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok) {
            return "Login Unsuccessful";
        }
        const body = await response.json();
        this.isAuthenticated = true;
        
        this.user = body;
    },
    async signout(cb) {
         const response = await fetch('/api/users/logout', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             }
         });

         if(!response.ok) {
             throw new Error('Logout Failed');
         }

         const body = await response.json();
         this.isAuthenticated = false;
         return body;

    }
}

export default auth;