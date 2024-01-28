const express = require("express");
const app = express();

const user = [{
    name: "jhon",
    kidneys: [
        { healthy: false },
        { healthy: true },
        { healthy: true }
    ]
}]
app.use(express.json())
app.get('/', function (req, res) {
    let jhonkidney = user[0].kidneys;
    let numberofkidney = jhonkidney.length;
    let numberofhealthykidney = 0;
    for (let i = 0; i < numberofkidney; i++) {
        if (jhonkidney[i].healthy == true) {
            numberofhealthykidney += 1;
        }
    }
    let numberofunhealthykidney = numberofkidney - numberofhealthykidney;
    res.json({
        numberofkidney,
        numberofhealthykidney,
        numberofunhealthykidney
    })
})

app.post('/', function (req, res) {
    const ishealthy = req.body.ishealthy
    user[0].kidneys.push({ healthy: ishealthy })
    res.json({
        msg: "done"
    })
})

app.put('/', function (req, res) {
    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (user[0].kidneys[i].healthy == false) {
            user[0].kidneys[i].healthy = true;
        }
    }
    res.json({});
})

app.delete('/', function (req, res) {
    if (atleastoneunhealthykidney()) {
        const newkidneys = [];
        for (let i = 0; i < user[0].kidneys.length; i++) {
            if (user[0].kidneys[i].healthy == true) {
                newkidneys.push({ healthy: true });
            }
        }
        user[0].kidneys = newkidneys;
        res.json({msg:"done"});
    }
    else {
        res.status(411).json({ msg: "there is no unhealthy kidney" });
    }

})

function atleastoneunhealthykidney() {
    let atleastone = false;
    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (user[0].kidneys[i].healthy == false) {
            atleastone = true;
            break;
        }
    }
    return atleastone;
}
app.listen(3000);