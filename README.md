# Movie Reveries: A Comprehensive Overview
 - [App Purpose](#app-purpose) 
 - [User Benefits](#user-benefits) 
 - [Technologies Used](#technologies-used) 
 - [Minimum Viable Base Functionality](#minimum-viable-base-functionality) 
 - [Actual Take](#actual-take) 
 - [Further Improvements if Time Allows](#further-improvements-if-time-allows) 


## App Purpose

This application allows users to add new movies to the database. Once a movie is in the database, users can create lists of these movies and share them with others. The main features include:

- [x] **Search and Add Movies**: Users can search for movies from an external API and add them to the database.
- [x] **Create Movie Lists**: Users can select movies from the database to make custom lists.
- [x] **Share Lists**: Users have the option to share their created lists with others.
- [x] **Download Lists**: Users can download their movie lists for offline access.

> Visit: https://movie-reveries.fly.dev/

### User Benefits

#### Benefits for General Users

1. **Search Movies** ✅: General users can search for movies within the database.
2. **View and Download Public Lists**✅: Users can view and download lists that are publicly available.
3. **Share Lists**✅: Users have the ability to share public lists with others.

#### Benefits for Registered Users

 1. **Add Movies to Database** ✅: Registered users can add new movies to the database.
 2. **Create and Manage Lists**✅: Users can create custom movie lists, save them for future use.
 3. **Comment on Lists**⬜️: Users can leave comments on lists, providing feedback and discussion.

[..🔝..](#movie-reveries-a-comprehensive-overview)

## Technologies Used

The backend is developed using Node.js Express framework and Apollo Server 4's Express Middleware, with MongoDB as the database, managed through the Mongoose driver.

The frontend is built with React, primarily utilizing built-in hooks, with Apollo Client handling most of the state management.

For robust development principles, the project employs GitHub Actions for CI/CD services and is developed within containerized environments using Docker Compose.

[..🔝..](#movie-reveries-a-comprehensive-overview)


## Minimum Viable Base Functionality
This section outlines the core functionalities of the application, which are essential for me to write end-to-end tests.

### Visitors


| Function                   | Test | Description |
|----------------------------|------|-------------|
|01. Shows all movies           | ☑ | Displays all movies available in the database on `/`.   |
|02. Shows all available lists  | ☑ | Shows all available lists generated by users on`/movielist`. |
|03. Displays a specific list   | ☑ | Displays a specific list from the database based on the provided ID on movielist/:params_id`. `/ |
|04. Search movies in the db    | ☑ | Allows visitors to search for all movies in the database on`/find`    |
|05. Export list in CSV         |   | Visitors can download any list in `.csv` format.     |
|06. Share list                 |   | Visitors can share any list.     |


### Registered Users

| Function                          | Test |  Description |
|-----------------------------------|------|--------------|
|07. User Registration                 | ☑    | Users can register an account.   |
|08. User Login                        | ☑    | Users can log in to their account.      |
|09. Manage Token Expiry               |     | Users are notified when their token is about to expire.    |
|10. Search Movies from External API   |     | Users can search for movies from an external API.   |
|11. Add Movie from Search Results     | ☑    | Users can add a movie from search results to the database.    |
|12. Create Lists                      | ☑    | Users can create lists from movies in the database.   |
|13. View Saved Lists                  |     | Users can view the lists they have saved.      |
|14. View Created Lists                | ☑    | Users can view the lists they have created.    |
|15. Remove Saved Lists                |     | Users can delete their saved lists.      |
|16. Remove Created Lists              |     | Users can delete the lists they have created.  |


[..🔝..](#movie-reveries-a-comprehensive-overview)
## Actual Take
```
My goal is to apply my knowledge of Test-Driven Development (TDD), CI/CD using GitHub Actions,
and containerization with Docker. To develop a web application that have more reliability process.
However, my actual actions partly deviated from the plan:

1. I set up and developed the application in containers using Docker.
2. I haven't implemented Test-Driven Development (TDD) practices.
3. End-to-end tests is still in progress.
4. CI/CD implementation is competent.
```

###  My current plan is to:
1. Implement all base functionality of the app.✅
2. Write tests after completing the functionality.⬜️
3. Reduce manual testing. Use End-to-End (e2e) Testing✅
4. Proceed with setting up the CI/CD pipeline once testing is in place. ✅


[..🔝..](#movie-reveries-a-comprehensive-overview)
## Further Improvements if Time Allows

#### Pagination

Currently using Mongoose's `find` method with the `limit` option to reduce the load on the database. Implementing cursor-based pagination is planned for more efficient data handling.

#### Reduce Re-rendering

Closely observe the state of the overall app to reduce re-rendering by moving custom hooks as close to the consumer components as possible.


#### Replicate Directory Structure and Component Composition of Popular React Apps

Currently, I've organized components by their functionality. For components with many nested sub-components, I've used numbers to show hierarchy.
Consider adopting best practices from well-known React applications for improved structure.


#### Authentication improvements

Currently using bcrypt (via hash-wasm library) to generate hash in server then store hashes in the database.
Using jsonwebtoken to sign and decode access tokens for every request between frontend and backend. When a token expired, the user is forced to re-login. Potential improvements include:
  - Invalidate old tokens when a new token is issued.
  - Implement refresh token concept for better user experience.
  - Consider using Passport.js to cover multiple authentication strategies and increase user coverage.


####  Use Recommended Data Router of react-router-dom Library Instead of JSX Router
Object-based routing can show better hierarchy compared to deeply nested JSX elements.
Consider adopting the data router approach for improved code organization and maintainability.

[..🔝..](#movie-reveries-a-comprehensive-overview)