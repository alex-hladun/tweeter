# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This project uses HTML, CSS, JS, jQuery and AJAX on the front-end as well as Node and Express on the back-end. It has features such as responsive design (mobile and desktop friendly), server posting/retrieval with AJAX, and form validation.

# Final Product

### Mobile View
!["Mobile View"](docs/mobile.png)

###  Tablet View
!["Tablet View"](docs/preview1.png)

### Desktop View
!["Desktop View"](docs/preview2.png)

# Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

# Dependencies
- Express
- Node 5.10.x or above
- Body-parser
- Chance
- Express
- md5

# Known Bugs / Road Map
- Issues with FAB appearing at different times for different screen sizes.
- Can't post tweet with Cmd + Enter.
- Add Flag / Retweet / Like functionality.
- Add user database / login features.
- Currently set up to only load the latest tweet from database when posting. If implementing with concurrent users, I would set up to remove / re-load all tweets. 
