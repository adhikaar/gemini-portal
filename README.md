Readme
------


Instructions
------------

This project is implemented in Angular Framework. The following features have bean implemented:

Users can Signup for an account. The following field must be provided at signup - Title , Full Name, Email (must be unique), Phone Number (must be unique), Date of Birth and Occupation.

Once an account is created, users can Login to their accounts by either their Email or their Phone Number, along with their Password.

Once logged in, the user is redirected to the Dashboard. The Dashboard displays a list of all registered users in a paginated tabular fashion.

There is a Search functionality implemented and a user can be searched using any field in his/her account. The Search bar is dynamic and shows the search results with every keystroke.

The Users can be sorted using any field by clicking the respective headers in the Table.

A user account can be Deactivated from the Dashboard. Deactivated Accounts will not be allowed to login.

A user account can be Permanently Deleted from the Dashboard.

The currently logged in user account cannot be Deactivated or Deleted. To Deactivate or Delete an account the user must be logged in from another account.

The Dashboard has the View button for every user to view his detailed profile. The detailed user profile page displays complete information about the user.

The User profile can be edited from the Detailed Profile Page by clicking Edit Profile.

The Email and Phone Number are each treated as the Unique Identifiers of an account and are used at Login. Hence they are not allowed to be changed after initial Signup. An account is uniquely identified by these field and all other fields can be updated at any time.

Validations have been placed on the User Account fields at the Signup Stage as well as the Profile Update Stage.

Name must be 3-50 characters long.

Email must follow the regular expression rules of a typical email address and must be unique.

Phone number must be a 10-digit number without leading 0/+91 and starting with 6/7/8/9. It must be unique.

Occupation must be 1-200 characters long.

Password must be 4-20 characters long.

For demonstration purposes the project is preloaded with some sample user data at startup.

Since their is no backend for persistence of data, the data refreshes to the initial state at every reload of the page in the browser.



DISCLAIMER
----------

This project is solely meant for Demo purposes only. All logos and names used belong to their respective trademarked owners.



Developed By
------------

Adhikaar Marwaha, Ph: 9953809852
