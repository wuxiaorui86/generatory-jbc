'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

function GeneratorJbc(args, options) {
	yeoman.generators.Base.apply(this, arguments);
}

util.inherits(GeneratorJbc, yeoman.generators.Base);

GeneratorJbc.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'projectName',
            message: 'Name of Project?',
            warning: ''
        },
        {
            name: 'author',
            message: 'Author Name:',
            warning: ''
        },
        {
            name: 'email',
            message: 'Author Email:',
            warning: ''
        }
    ];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }
        this.projectName = props.projectName;
        this.author = props.author;
        this.email = props.email;
        cb();
    }.bind(this));
};

GeneratorJbc.prototype.packageJSON = function packageJSON() {
	var packageJSON = {
	  "name": this.projectName,
	  "author" : this.author,
	  "email" : this.email,
	  "version": "1.0.0",
	  "devDependencies": {
		"grunt": "~0.4.1",
		"grunt-kmc": "~0.1.1",
		"grunt-contrib-uglify": "~0.2.0",
		"grunt-contrib-cssmin": "~0.6.1",
		"grunt-contrib-copy": "~0.4.1",
		"clean-css": "~1.0.9"
	  }
	}
    this.write('package.json', JSON.stringify(packageJSON, null, 4));
};

GeneratorJbc.prototype.app = function app() {
	this.mkdir('src');
	this.mkdir('src/v1');
	this.template('src/v1/index.js');
	
	this.mkdir('build');
	
	this.mkdir('demo');
	this.copy('demo/index.html','demo/index.html');
	
	this.copy('Gruntfile.js', 'Gruntfile.js');
	this.copy('gitignore', '.gitignore');
	this.copy('README.md', 'README.md');
};

module.exports = GeneratorJbc;
