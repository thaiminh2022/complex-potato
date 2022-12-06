# Site Documentation

## 1. Routing

This section is dedicated to explain __routing__ to the user:

1. The Home route:
The home route is a single route that has some quick actions to others route

2. The Xin Phep route:
Xin phep route contains 2 key elements, __user__ and __admin__. _User_ can use the route to write forms to ask for any permission that is available. _Admin_ can use the route to view and mark the form as accepted or rejected. </br>
__NOTE:__ Admin is a user with higher permissions.

3. The Thong Bao route:
Xin phep route contains 2 key elements, __public__ and __admin__. _Public_ Route will be use to display any thong bao that's written by the admin in 2 form, short/long. _Admin_ can use the route to create or edit their thong bao. </br>
__NOTE:__ Admin is a user with higher permissions. </br>
__NOTE:__ Supported thong bao type is text with attachments or only files, files will.

4. The User route:
User route will display the user information and has children routes for register and login.</br>
__NOTE:__ Admin or User will have a custom badge.

## 2. Navbar

Navbar display consist of 2 key elements, __topnav__ and __sidenav__.

- _TopNav_ will contains quick actions and a warm welcome to the user.
- _SideNav_ Most contents will be displayed in the sidenav, containing user profile and additional admin tools </br>
__NOTE:__ BOTH will contains a button for signing out and logging in
