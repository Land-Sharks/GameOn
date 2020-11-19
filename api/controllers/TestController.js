const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require('../models');
const { User, Game, Post } = db;

router.post("/", async (req, res) => {


    await fillDatabaseWithGames();
    await fillDatabaseWithUsers();
    await fillDatabaseWithPosts();
    await fillDatabaseWithGameFollows();

    res.status(200).json("SUCCESFUL");
    
});

const fillDatabaseWithGames = async () => {

    try {
        const gameFill = await fetch('http://localhost:8080/api/games/fill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await gameFill.json();
        console.log("DB filled with sample games");
    } catch {
        console.log("Failed to fill games")
    }

} 

const fillDatabaseWithUsers = async () => {

    try {
        const users = [
            {
                username: 'derickfan',
                firstName: 'Derick',
                lastName: 'Fan',
                email: 'derickfan@gmail.com',
                password: 'password',
            }, {
                username: 'sharwit',
                firstName: 'Sharrar',
                lastName: 'Wasit',
                email: 'Wasit@gmail.com',
                password: 'password',
            }, {
                username: 'dmiller88',
                firstName: 'Darien',
                lastName: 'Miller',
                email: 'dmiller@gmail.com',
                password: 'password',
            }
        ];

        users.forEach(async (content) => {
            console.log(content);
            const signUp = await fetch('http://localhost:8080/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(content)
            });

            console.log("DB filled with Users");
        });
    } catch {
        console.log("Failed to fill users");
    }

}

const fillDatabaseWithPosts = async () => {
    
    try {
        const posts = [
            {
                username: 'derickfan',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et luctus urna, ut aliquam erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam commodo tellus vitae eleifend tincidunt. Phasellus eget facilisis tortor. Maecenas ac pretium mauris. Pellentesque a mauris fringilla sem eleifend euismod. Suspendisse accumsan in odio in mattis. Phasellus ornare vulputate convallis. Ut egestas ligula non malesuada suscipit. Proin eget elit accumsan, tincidunt magna sed, feugiat dolor. Donec congue tellus at dui auctor euismod. Aliquam mattis ex non elit pulvinar placerat. Suspendisse imperdiet volutpat augue, ut sollicitudin libero condimentum sit amet.',
            }, {
                username: 'derickfan',
                text: 'Praesent tincidunt risus felis, non pellentesque nisi sollicitudin nec. Aenean imperdiet velit bibendum libero vehicula iaculis. Vestibulum quis risus eu massa molestie volutpat vitae non nunc. Morbi luctus feugiat sem, vitae faucibus lorem porttitor vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur ut lacinia sem. Vestibulum in molestie tortor, id hendrerit lacus. Vestibulum dignissim mattis egestas. Praesent ut nisi gravida, sodales dolor sit amet, luctus elit. Vivamus commodo nulla sodales augue faucibus varius. Sed sit amet lacinia ipsum.'
            }, {
                username: 'sharwit',
                text: 'Fusce maximus vitae est et blandit. Aliquam ultricies malesuada lorem, vestibulum fermentum dui condimentum sit amet. Suspendisse sollicitudin lacus et auctor aliquam. Vivamus consequat ligula vel commodo auctor. Nam id imperdiet nisi. Fusce in odio erat. Sed volutpat nulla eu enim placerat sollicitudin.'
            }, {
                username: 'sharwit',
                text: 'Donec molestie laoreet urna, et blandit enim imperdiet vitae. Vivamus tincidunt, nisi id vehicula suscipit, eros dui convallis elit, non convallis nisl elit vitae dui. Proin sit amet rutrum nisl, sed pellentesque turpis. Duis tristique lacinia lorem, ut vulputate ex venenatis a. Sed gravida lacus accumsan, iaculis nisi eget, pulvinar sem. Ut tempor fringilla est. Duis pretium nunc eu vehicula venenatis. Fusce porta velit in odio consectetur dictum. Vivamus ut metus at odio rhoncus maximus. Pellentesque sagittis fermentum nisi, id ornare mi hendrerit ac. Pellentesque et ultricies purus, non bibendum leo.'
            }, {
                username: 'dmiller88',
                text: 'Nunc id turpis sed sem fringilla iaculis. Phasellus luctus mollis vehicula. Ut quis feugiat mi. Sed lorem dui, imperdiet non feugiat congue, ullamcorper ac nisi. Suspendisse consequat, lorem et tristique imperdiet, massa nisl vestibulum orci, vel posuere augue arcu vel ipsum. Suspendisse mollis, quam vitae tempus lacinia, nunc justo molestie mi, a euismod felis velit varius massa. Vivamus congue posuere volutpat. Suspendisse gravida, felis bibendum laoreet mattis, risus felis finibus ante, eget rutrum sem erat non nibh.'
            }, {
                username: 'dmiller88',
                text: 'Mauris rhoncus, est vitae faucibus pellentesque, velit lacus imperdiet justo, sed consectetur orci sem sed velit. Cras nec neque sed lorem sollicitudin bibendum. Vivamus nisi nunc, eleifend vel laoreet at, pharetra ac arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis aliquam libero, in blandit purus mollis sed. Nulla gravida tempus erat, vitae gravida turpis porttitor vitae. Nunc in posuere tortor.'
            }, {
                username: 'dmiller88',
                text: 'Maecenas ut ligula elit. Sed ultricies massa id est aliquam scelerisque. Suspendisse non commodo dolor. In aliquam pulvinar massa eget lacinia. Maecenas cursus est ante, sed suscipit augue iaculis et. In est nulla, congue quis euismod vitae, fermentum eget dolor. Curabitur vitae velit in libero dictum mollis. Pellentesque malesuada velit a elementum dignissim. Sed elementum eu lacus id condimentum. Nullam sed eros ut ipsum congue laoreet quis id ante.'
            }
        ];

        posts.forEach(async (content) => {
            const post = await fetch('http://localhost:8080/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(content)
            });

        })
        console.log("DB succesfully filled with posts");
    } catch {
        console.log("Failed to add posts");
    }

}

const fillDatabaseWithGameFollows = async () => {

    try {
        const follows = [
            {
                username: 'derickfan',
                gameId: 1,
            }, {
                username: 'derickfan',
                gameId: 2,
            }, {
                username: 'derickfan',
                gameId: 3,
            }, {
                username: 'sharwit',
                gameId: 6,
            }, {
                username: 'sharwit',
                gameId: 7,
            }, {
                username: 'sharwit',
                gameId: 10,
            }, {
                username: 'sharwit',
                gameId: 20,
            }, {
                username: 'dmiller88',
                gameId: 7,
            }, {
                username: 'dmiller88',
                gameId: 15,
            }, {
                username: 'dmiller88',
                gameId: 19,
            },
        ];

        follows.forEach(async (content) => {
            const follow = await fetch('http://localhost:8080/api/games/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content)
            });
        });
        console.log("DB filled with sample follows");
    } catch {
        console.log("Failed to follow games");
    }

}

module.exports = router;