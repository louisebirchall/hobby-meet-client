# Project 3: **HobbyMeet**

## Description
**Hobby Meet for Charities** is a social media for a growing community with different kind of hobbies that can be done together in events or workshops. The revenues will be donated to different charities.

## User Stories

* Signup/Register - any user can signup for our web app.
* Login - registered user will be able to login.
* Logout - when registered user is logged in they will be able to logout.
* Search profile - registered and logged in users will be able to search the list of profiles.
* View detailed profile - registered and logged in users will be able to see other users profile.
* Edit profile - registered user needs to be logged in to be able to edit the private profile.
* Delete profile - registered user or admin will be able to delete profiles.

* Search hobbies - registered and logged in users will be able to search list of hobbies.
* Filter hobbies - registered and logged in users will be able to filter the list of hobbies.
* Add hobbies - logged in admins will be able to add hobbies.
* Edit hobbies - logged in admins will be able to edit hobbies.
* Delete hobbies - logged in admins will be able to delete hobbies.
* Comment hobbies - registered and logged in users will be able to comment hobbies.

* Search events - registered and logged in users will be able to search list of events.
* Add events - registered and logged in users will be able to add new events.
* Edit events - registered and logged in users will be able to edit the events they created. admins will be able to edit every event.
* Delete events - registered and logged in users will be able to delete the events they created. admins will be able to delete every event.
* Comment events - registered and logged in users will be able to comment events.

* Add charities - logged in admins will be able to add charities.
* Edit charities - logged in admins will be able to edit charities.
* Delete charities - logged in admins will be able to delete charities.

## MVP

* Signup, login, logout
* Create, edit, delete profile
* Search list of profiles, view detailed profile

* Create, edit, delete posts

* Create, edit, delete, search, filter hobbies

* Create, edit, delete, search events

* Create, edit, delete charities

## Bonus

* Direct messages/chat: user to user and contacting the owner of the app
* Integrating mapbox into events
* Integrating a weather API to see the weather related to the event location

## Client

### Frontend Routes 

Path | Component | Permissions | Behaviour
---- | --------- | ----------- | ---------
/ | NavBar, specific hobbies, events, users, Footer | public | Homepage with overview and buttons to signup or login.

/signup | NavBar, SignupForm, Footer | public | User can signup, redirected to profile (private Route).

/login | NavBar, LoginForm, Footer | public | Registered user can login, redirected to profile (private Route).

/logout | NavBar, LoginForm, Footer | private for loggedin users | Loggedin user logs out, destroys session, redirected to hompeage.

/profile | NavBar, Profile, _Relations to attended events, attending (upcoming) events, created or commented posts_, Footer | private for loggedin users | Profile of loggedin user.

/profile/edit | NavBar, EditProfileForm, Footer | private for loggedin users | User can edit it's own profile. Redirected to profile after changes submitted.

/profile/delete | | private for loggedin users | User can deletes it's own profile. Redirected to homepage.

/hobbies | NavBar, _AddHobbyBtn_, SearchBar, HobbyFilter _Buttons or Dropdown_, HobbyList, Footer | private for loggedin users | List of all hobbies that can be searched, filtered and new ones to be added by loggedin user.

/hobbies/add | NavBar, AddHobbyForm, Footer | private for loggedin users | Loggedin user can create new hobby.

/hobbies/:id | NavBar, HobbyDetails, EditHobby, DeleteHobby, CommentHobbyForm, Footer | private for loggedin users | Detailed view of hobby. Can be edited/deleted by creator/admin. Loggedin user can comment.

/hobbies/:id/edit | NavBar, EditHobbyForm, Footer | private for loggedin user (creator/admin) | Creator or admin can edit hobby. Redirected to edited hobby.

/hobbies/:id/delete |  | private for loggedin user (creator/admin) | Creator or admin can delete hobby.Redirected to /hobbies. 

/events | NavBar, _AddEventBtn_, SearchBar, EventList, Footer | private for loggedin users | List of all events that can be searched and new ones to be added by loggedin user.

/events/add | NavBar, AddEventForm, Footer | private for loggedin users | Loggedin user can create new event.

/events/:id | NavBar, EventDetails, EditEvent, DeleteEvent, CommentEventForm, Footer | private for loggedin users | Detailed view of event. Can be edited/deleted by creator/admin. Loggedin user can comment.

/events/:id/edit | NavBar, EditEventForm, Footer | private for loggedin user (creator/admin) | Creator or admin can edit event. Redirected to edited event.

/event/:id/delete |  | private for loggedin user (creator/admin) | Creator or admin can delete event. Redirected to /event. 

/charity | NavBar, _AddCharityBtn_, CharityList, Footer | private for loggedin users | List of all charities.

/charity/add | NavBar, AddCharityForm, Footer | private for admins | Loggedin admin can create new charity.

/charity/:id | NavBar, CharityDetails, EditCharity, DeleteCharity, Footer | private for loggedin users | Detailed view of charity. Can be edited/deleted by admin.

/charity/:id/edit | NavBar, EditCharityForm, Footer | private for loggedin admin | Admin can edit charity. Redirected to edited charity.

/charity/:id/delete | - | private for loggedin admin | Admin can delete charity. Redirected to /charity.

/404 | Error, ErrorRedirect | public | Page cannot be found? User needs information about it -> error handling with error 404. Btn ErrorRedirect to get to homepage.

/product | | |

/product/create | | |

/product/:id/edit | | |

/product/:id/delete | | | 

/post | | |

/post/create | | |

/post/:id/edit | | |

/post/:id/delete | | | 

/reviews | | |

/reviews/create | | |

/reviews/:id/edit | | |

/reviews/:id/delete | | | 

### Components

* Homepage
* NavBar
* Footer
* CommentForm
* Error
* ErrorRedirect
#### User
    * SignupForm
    * LoginForm
    * Profile
    * EditProfile
#### Hobby
    * HobbyList (with filters)
    * SearchHobbyForm
    * HobbyForm
    * HobbyDetails
#### Event
    * EventList (with filters)
    * SearchEventForm
    * EventForm
    * EventDetails
#### Charity
    * CharityList (with filters)
    * SearchCharityForm
    * AddCharity
    * EditCharity
    

### Services
* Auth Service
    * auth.signup
    * auth.login
    * auth.logout

### Packages
* _usuals_
* axios
* cloudinary
* mongo
* express

### Libraries
* react
* material UI
* node

## Server

### Models

#### User Model
#### Hobby Model
#### Event Model
#### Post Model
#### Charity Model
#### Product Model
#### Review Model
#### _Direct Messages_

## Links

### Git
Links to client and server repository + deployed Web App 

#### Wireframes
* [Project Wireframes](https://www.figma.com/file/Un8pPmcCWTmhsaF4WnIG0N/Wireframing-in-Figma?node-id=0%3A420)

#### Frontend
* [Client Repository](https://github.com/louisebirchall/hobby-meet-client)

#### Backend
* [Server Repository](https://github.com/louisebirchall/hobby-meet-server)

### Slides
Link to the project presentation

* [Presentation]()

