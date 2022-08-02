# Tax Office of Michael Haney
# (Refactor using tailwind, modernizing look in progress!)

This was a website I built for a professional friend who prepares personal and corporate tax returns.
It offers a central place for clients to book (using a third party API) appointments with links to
the IRS site to check on refunds, as well as cards featuring recent articles on their site.

# Technologies used:
* React
* Formik for forms
* React-bootstrap
* FullCalendar for calendar.
* Font Awesome icons
* Fullslate API for scheduling appointments (its the appointment site he was already using I just utilized the API).

# What did I learn
This was my first public site to go live and was the first where I was working with a deadline.
I learned how to manage time to get a project done. I learned about using Formik for form and form validation,
as well as teaching myself how to use the FullCalendar component to render the available appointments being returned from the Full Slate API.
When an appointment is clicked on, a modal appears where the client enters their info (made & validated by Formik) and makes the request to
Full Slate at which time they will be returned to the home page and met with a success or failure toast (hopefully the former).

# Hurdles Overcome
* Parsing incoming data from as well as sending data to a third party api.
* Creating a calendar component, initially I tried to make my own Calendar component, but after
  researching I opted to learn FullCalendar and implement that.
* Working for a client, going back and forth about what to add or not, dealing with
  indecision and being able to deliver something they like and can be proud of.



# Because this is a live site I posted a video of the process of making an appointment.
You are more than welcome to visit the site, but please remember it is live and appointments made are real.
https://mhtaxpro.com

https://user-images.githubusercontent.com/51846919/180843905-1f2b5590-7ca4-47c7-a562-249c3ba84321.mp4


