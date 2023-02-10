// This is a generic gulpfile for use with buddy
const { src, dest } = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const { series } = require('gulp');
const replace = require('gulp-replace');

// Takes the passed in arguments from Buddy and updates the production environment file
function replaceBuddyProduction() {
    return src('./.env')
        .pipe(replace('CUSTOM_BUDDY_ID=0', `CUSTOM_BUDDY_ID=${argv.id}`))
        .pipe(replace('CUSTOM_BUDDY_NAME=A', `CUSTOM_BUDDY_NAME=${argv.name}`))
        .pipe(dest('./'));
}
function replaceBuddyDevelopment() {
    return src('./.env.development')
        .pipe(replace('CUSTOM_BUDDY_ID=0', `CUSTOM_BUDDY_ID=${argv.id}`))
        .pipe(replace('CUSTOM_BUDDY_NAME=A', `CUSTOM_BUDDY_NAME=${argv.name}`))
        .pipe(dest('./'));
}
exports.default = series(replaceBuddyProduction, replaceBuddyDevelopment);