# Name of Project: Enphase Dashboard by Paul LeTourneau

## Project's Purpose or Goal: This dashboard will provide easy to information about a solar array with Enphase microinverters using the Enlighten API v4 (https://developer-v4.enphase.com/).

<ul>
<li> For the user it will simplify the display when compared to the Enphase monitoring site. It will also allow them to share energy production to social media (stretch goal) </li>
<li> For the client, a solar installer, it will allow for ease of contact in case of microinverter outage. It will also show their branding on the app AND social media posts. Lastly it will provide a low friction way for users to refer clients.</li>
</ul>

## List the absolute minimum features the project requires to meet this purpose or goal:

### Project MVP

<ul> 
<li> App will connect to Enphase API using OAuth 2.0 </li>
<li> App will pull and display data from API </li>
<li> Company branding will be sleek and small, yet prominent</li>
<li> User will have low friction ways to contact company via email for service/troubleshooting and referrals</li>
<li> Tokens will be stored SECURELY on the server side using express</li>
<li> Error messages will be given for an inverter not responding while sun is down</li>
</ul>

### Project Planning MVP

<ul>
<li> User interviews will be held </li>
<li> Project will be wireframed </li>
</ul>

## What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.

### Project Tools

<ul>

<li> React</li>

<li> Oauth 2.0</li>

<li> Express server</li>

<li> HTML/CSS/JS/Bootstrap</li>

<li> Passport (for OAuth 2.0)</li>

</ul>

### Project Planning Tools

<ul>

<li> Figma </li>

<li> Miro </li>

<li> User Interviews </li>

</ul>

## If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.

<ul>

<li> Additional user interviews before next iterations </li>

<li> Add 3d animations (subtle) for styling </li>

<li> A way for the user to create a "brag" post on social media with installer branding. Possibly with referral links embedded </li>

<li> Embedded weather forecast through API</li>

<li> Database for historical data to compare to current</li>

<li> A swift app for iOS integration (the goal is to get an appleTV app that would display data as a screensaver) </li>

</ul>

## What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?

<ul>

<li> Three.js for 3D animations </li>

<li> External Weather API (unsure yet which one) </li>

<li> Swift and XCode</li>

</ul>

## Is there anything else you'd like your instructor to know?

<p> This project is still evolving! The database for historical data is definately a goal, but unsure as of yet if the user is wanting it or not. Between Oauth, company branding, and social media integration I believe there to be more than 40 hours of work here. If there is not, iOS development will be explored. </p>
