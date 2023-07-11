# Gympass using Docker and learning SOLID
:whale: Creating an API using docker for PostgreeSQL, and learning SOLID.

## App

## Functional Requirements

- [] Should be able to sign up;
- [] Should be able to sign in;
- [] Should be able to obtain user profile;
- [] Should be able to obtain check-ins performed by user;
- [] Should be able to obtain your check-ins summary;
- [] Should be able to search near gyms;
- [] Should be able to search gyms by name;
- [] Should be able to perform check-in in at gym;
- [] Should be able to validate an user check-in;
- [] Should be able to register a gym;

## Business Rules

- [] User must not be able to register with a duplicated e-mail;
- [] User can not do 2 check-ins at same day;
- [] User can not do check-in if not be near 100m at the gym;
- [] Check-in can only be valid up to 20 minutes after being created;
- [] Check-in can only be valid by administrators;
- [] The gym can only be registered by adminstrators

## Unfunctional Requirements

- [] User's password needs to be encrypted
- [] Aplication data needs to be persisted on PostgreeSQL
- [] All data lists needs to be paginated with 20 itens per page
- [] User must be identified by a JWT(JSON Web Token)
