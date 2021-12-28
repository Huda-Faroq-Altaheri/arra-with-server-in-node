const http = require('http');
const { nanoid } = require('nanoid')

let users = [
    { id: 1, name: "huda", email: "huda@gmail.com", age: 21 },
    { id: 2, name: "Khawla", email: "Khawla@gmail.com", age: 23 },
    { id: 3, name: "lila", email: "lila@gmail.com", age: 45 }
]

const server = http.createServer((req, res) => {
    const { url, method } = req;
    if (url == '/getAllUser' && method == 'GET') {
        res.write(JSON.stringify(users));
        res.end();
    } else if (url == '/addUser' && method == 'POST') {

        let bodyData;
        req.on('data', (chunk) => {
            bodyData = chunk;
        })
        req.on('end', () => {
            const parseBodyData = JSON.parse(bodyData);

            const findUser = users.find((ele) => {
                return ele.email == parseBodyData.email;
            })
            if (findUser) {
                res.write("Sorry, Email is Already Axist ");
                res.end();
            } else {
                parseBodyData.id = nanoid();
                console.log(parseBodyData.id);
                users.push(parseBodyData)
                res.write(JSON.stringify(users));
                res.end();
            }
        })

        // ******************************************* another way ***********************************
        // req.on('end', () => {
        //     const parseBody = JSON.parse(Buffer.concat(body));
        //     const exist = users.find((el) => (el.id == parseBody.id));
        //     if (!exist) {
        //         users.push(parseBody);
        //         res.write(JSON.stringify(users));
        //         res.end();
        //     } else {
        //         res.write("User Id Already Exist");
        //         res.end();
        //     }
        // })
    } else if (url == '/update' && method == 'POST') {

        let bodyData;
        req.on('data', (chunk) => {
            bodyData = chunk;
        })
        req.on('end', () => {

            const parseBodyData = JSON.parse(bodyData);
            let globalId;

            let findUserId = users.find((el, i) => {
                globalId = i;
                return el.id == parseBodyData.id;
            })

            if (findUserId) {
                parseBodyData.id = nanoid();
                const { name, email, age } = parseBodyData
                users[globalId].name = name;
                users[globalId].email = email;
                users[globalId].age = age;
                res.write(JSON.stringify(users));
                res.end();
            } else {
                res.write("in-valid id");
                res.end();
            }

        })

        // ******************************************* another way ***********************************
        // const body = [];
        //     req.on('data', (chunk) => {
        //         body.push(chunk);
        //     });
        //     req.on('end', () => {
        //         const parseBody = JSON.parse(Buffer.concat(body));
        //         users = users.map((el) => (el.id == parseBody.id ? parseBody : el));
        //         res.write(JSON.stringify(users));
        //         res.end();
        //     });
        // } else if (req.url == '/delete' && req.method == 'POST') {
        //     const body = [];
        //     req.on('data', (chunk) => {
        //         body.push(chunk);
        //     });
        //     req.on('end', () => {
        //         const parseBody = JSON.parse(Buffer.concat(body));
        //         users = users.filter((el) => el.id != parseBody.id);
        //         res.write(JSON.stringify(users));
        //         res.end();
        //     });
    } else if (url == '/delete' && method == 'POST') {

        let bodyData;
        req.on('data', (chunk) => {
            bodyData = chunk;
        })
        req.on('end', () => {
            const parseBodyData = JSON.parse(bodyData);
            let globalId;
            let findUserId = users.find((el, i) => {
                globalId = i;
                return el.id == parseBodyData.id;
            })
            if (findUserId) {
                users.splice(globalId, 1);
                res.write(JSON.stringify(users));
                res.end();
            } else {
                res.write("in-valid id");
                res.end();
            }
        })
    } else if (url == '/getUserById' && method == 'POST') {
        let bodyData;
        req.on('data', (chunk) => {
            bodyData = chunk;
        })
        req.on('end', () => {
            let parseBodyData = JSON.parse(bodyData);
            const findId = users.find((ele) => {
                return ele.id == parseBodyData.id
            })
            if (findId) {
                res.write(JSON.stringify(findId));
                res.end();
            } else {
                res.write("in-valid id");
                res.end();
            }
        })


        // ******************************************* another way ***********************************
        // const body = [];
        // req.on('data', (chunk) => {
        //     body.push(chunk);
        // });
        // req.on('end', () => {
        //     const parseBody = JSON.parse(Buffer.concat(body));
        //     const existId = users.find((el) => (el.id == parseBody.id));
        //     if (existId) {
        //         res.write(JSON.stringify(existId));
        //         res.end();
        //     } else {
        //         res.write('This Name is Not found');
        //         res.end();
        //     }
        // });

    } else if (url == '/searchByKey' && method == 'POST') {

        let bodyData;
        req.on('data', (chunk) => {
            bodyData = chunk;
        })
        req.on('end', () => {
            const parseBodyData = JSON.parse(bodyData);
            const newUser = users.find((el) => {
                const { id, name, email, age } = parseBodyData;
                return el.name == name ||
                    el.id == id ||
                    el.email == email ||
                    el.age == age;
            })
            if (newUser) {
                res.write(JSON.stringify(newUser));
                res.end();
            }
            else {
                res.write("Sorry,This data is Not found..try another data");
                res.end();
            }


        })

        // ******************************************* another way ***********************************
        // const body = [];
        // req.on('data', (chunk) => {
        //     body.push(chunk);
        // });
        // req.on('end', () => {
        //     const parseBody = JSON.parse(Buffer.concat(body));
        //     const existName = users.find((el) => (el.name == parseBody.name));
        //     if (existName) {
        //         res.write(JSON.stringify(existName));
        //         res.end();
        //     } else {
        //         res.write('This Name is Not found');
        //         res.end();
        //     }
        // });
    } else if (url == '/getAllUserReveres' && method == 'GET') {
        const reversed = users.reverse();
        res.write(JSON.stringify(reversed));
        res.end();
    } else {
        res.write('404 Not Found');
        res.end();
    }

});

server.listen(5000, () => {
    console.log('server is running');

})
