const fs = require('fs');
const _ = require("lodash");
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs
.command('add','Add new note',{
    title:{
        describe:'Title of note',
        demand:true,
        alias:'t'
    },
    body:{
        describe:'Body of note',
        demand:true,
        alias:'b'
    }
})
.help()
.argv;
command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        notes.logNote(note);
        console.log("The note is added.");
    } else {
        console.log("\nCan't add. Title is taken.")
    }
} else if (command === 'list') {
    var notesArray = notes.getAll();
    console.log(`Printing ${notesArray.length} notes`);
    notesArray.forEach((note)=>{
        notes.logNote(note);
    });

} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);        
    } else {
        console.log("note not found");
    }
} else if (command === 'remove') {
    var rem = notes.remNote(argv.title);
    if (rem) {
        console.log(`---\nNote with ${argv.title} as title has been removed\n---`);
    } else {
        console.log(`---\nNote with ${argv.title} as title not found\n---`)
    }
} else {
    console.log("Command not recognized");
}