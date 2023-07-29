# Gympass using Docker and learning SOLID
:whale: Creating an API using docker for PostgreeSQL, and learning SOLID.

## App

# RFs (Functional Requirements)
- [X] Should be able to register;
- [X] Should be able to authenticate;
- [X] Should be able to get the profile of a logged-in user;
- [X] Should be able to get the number of check-ins performed by the logged-in user;
- [X] Should be able to get the check-in history of the user;
- [X] Should be able to search for nearby gyms (Up to 10km);
- [X] Should be able to search for gyms by name;
- [X] Should be able to perform a check-in at a gym;
- [X] Should be able to validate a user's check-in;
- [X] Should be able to register a gym;
- [X] Should be able to allow users to change their passwords;
- [X] Should be able to allow users to recover their passwords through an email;
- [X] Should be able to allow users to deactivate their own profile;
- [X] Should be able to allow administrators to deactivate a user's profile;
- [X] Should be able to allow users to filter gyms by the types of activities offered (e.g., yoga, pilates, weightlifting, etc.);
- [X] Should be able to allow users to view the operating hours of gyms;
- [X] Should be able to allow administrators to manage the operating hours of gyms.
- [X] Should be able to allow users to rate gyms after a check-in;
- [X] Should be able to allow users to view gym ratings;
- [X] Should be able to allow users to view peak hours of gyms;
- [X] Should be able to offer plans for users;
- [X] Should be able to send plan renewal reminders to users;
- [X] Should be able to allow users to view their progress over time (e.g., consecutive check-ins, etc.);
- [X] Should be able to allow administrators to create promotions or discounts on plans.

# RNs (Business Rules)
- [X] Users should not be able to register with a duplicate email;
- [X] Users cannot check in twice on the same day;
- [X] Users cannot check in if they are not close (100m) to the gym;
- [X] Check-ins can only be validated up to 20 minutes after being created;
- [X] Check-ins can only be validated by administrators;
- [X] Gyms can only be registered by administrators;
- [X] Users can only deactivate their own profile;
- [X] Only administrators can deactivate user profiles, even if they are administrators;
- [X] The search by activity type should only return gyms that offer all the searched activities.
- [X] Users can only rate the gym after checking in;
- [X] Peak hours are calculated based on user check-ins;
- [X] Plan renewal reminders should be sent one week before the end of the current plan;
- [X] Users cannot check in without a plan;
- [X] Users cannot use resources beyond their plan;
- [X] Promotions or discounts can only be applied to plans by administrators.

# RNFs (Non-Functional Requirements)
- [X] User passwords need to be encrypted;
- [X] Application data must be persisted in a PostgreSQL database;
- [X] All data lists must be paginated with 20 items per page;
- [X] Users must be identified by a JWT (JSON Web Token);
- [X] The password recovery process must be secure and use unique and temporary verification tokens;
- [X] The application must be resilient and capable of handling a large volume of data;
- [X] All interactions with the user must be fast and responsive;
- [X] User passwords cannot be stored in plain text and must be properly encrypted.
- [X] Gym reviews must be publicly visible to help other users in their choice;
- [X] User progress information must be kept private and only accessible to the user;
- [X] Plan renewal reminders must be sent by email;
- [X] The system must be able to support a large number of users and gyms simultaneously.