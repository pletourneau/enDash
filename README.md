# _Enphase Solar Dashboard_

#### By _Paul LeTourneau_

#### _User dashboard for monitoring solar arrays that use Enphase microinverters_

## Technologies Used

- _JavaScript_
- _HTML_
- _CSS_
- _Node.js v18.17.1_
- _NPM v9.6.7_
- _React_
- _JSX_
- _Figma_
- _OAuth 2.0_
- _Enphase API v4_
- _Express_
- _Axios_

## Description

_Solar Dashboard for owners of residential solar systems that use compatible Enphase Energy microinverters. Dashboard was designed with free version of API and can only access system summary and microinverter telemetry data. With paid subscription or installer partner plan many more options, including live data, are available. Current outputs display as a graph with the last 288, five minute, intervals, filtering only non-zero intervals for display. There is a status section that shows the status message from the API call. It also converts lifetime production into kWh and total trees grown for 10 years from seedlings. And has a picture of Bob Ross. Other comedic output can be added to keep user engagement up. See examples near the bottom._

## Setup/Installation Requirements

- _$ clone project from github (https://github.com/pletourneau/enDash)_
- _$ cd enDash_
- _$ npm install_

- _register app with enphase (https://developer-v4.enphase.com/admin/applications) to get API Key, Client ID, Client Secret to use below in environment variables_
- _encode the Client ID and Client Secret into base64 (following instructions in step 8 here https://developer-v4.enphase.com/docs/quickstart.html) at this website https://www.base64encode.org/ and save the result as an environment variable_
- _get System ID from residential solar system owner with compatible Enphase Microinverters_
- _set up account on Heroku (or host of your choosing) https://devcenter.heroku.com/articles/heroku-cli_
- _$ heroku create_
- _set environment variables on Heroku in dashboard OR heroku config $ heroku config: set varName=value_
- _$ git push heroku main_
- _$ heroku open_
- _$ npm start_

## Source for Production Estimates

_https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results_

## Known Bugs

- _Refresh token is not currently used. Code is outlined, but not correct_
- _System ID is currently hard coded as an env variable. For production releases that should be an input_

## Example comedic output pictures

- _These are pictures of sample output to keep users engaged with app_

  <img src="./src/img/Status Snoop n Willie.jpg">
  <img src="./src/img/Status Bob.jpg">
  <img src="./src/img/Status Santa.jpg">
  <img src="./src/img/Status Talladega.jpg">

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright (c) _2023_ _Paul LeTourneau_

### Research & Planning Log

#### Friday, 12/01

- 8:00: organize and add readme and capstone proposal
- 10:30: watch video on setting up passport (https://www.youtube.com/watch?v=eDf91hihLpo)
- 10:40: Looks like i need AuthO now? Studying their site and docs (https://manage.auth0.com/dashboard/us/dev-hrmujmh4fu04bkdm/onboarding)
- 11:30: asking chatGPT for assistance with project before lunch
- 1:35: issues with CORS. doing non gpt research at https://m.youtube.com/watch?v=8T8dEuUP79w&pp=ygURI2dhdGVzX29mX29seW1wdXM%3D, https://m.youtube.com/watch?v=u2vn14Xb99s, and stack overflow (multiple)

#### Thursday, 12/07 (Confirmed with Cameron that we could work on project after applying for jobs)

- 2:30 looking over quick start guide again. https://developer-v4.enphase.com/docs/quickstart.html and watching youtube about exchanging oauth tokens https://www.youtube.com/watch?v=996OiexHze0

- 3:50 trying to troubleshoot environmental variables. I am now getting 403 errors in return. Something is amiss.

- 4:50 WIP 3. Auth URL

#### Friday, 12/08

- 9:00am testing out queries in postman. got this to work around 940 to grant a token. still not working in app
  curl --location 'https://api.enphaseenergy.com/oauth/token' \
  --header 'Authorization: Basic MTkyZWY0YzJiMmY2NWFlMGU2N2ViOTNlYjQwMmU0MzA6ZDJhNzM5NjRhMTg5NjhkM2I2MWZjNzA0Yjg5YWQzMmY==' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'Cookie: SESSION=dfd660ba-e931-4168-8382-d6318abb6a91' \
  --data-urlencode 'grant_type=authorization_code' \
  --data-urlencode 'code=QboYec' \
  --data-urlencode 'redirect_uri=https://api.enphaseenergy.com/oauth/redirect_uri'

#### Friday, 12/15

- 1:00pm looking over token refresh https://developer-v4.enphase.com/docs/quickstart.html

- 4:00pm internet out. googling on my phone to fin out how to join 2 api calls in one request. https://stackoverflow.com/questions/73174642/component-making-two-api-calls-from-single-dispatch

#### Tuesday, 12/19

-1:15 pm finding out how to translate kwh into trees/miles driven https://forterra.org/carbon-calculator-individuals/?gclid=Cj0KCQiAm4WsBhCiARIsAEJIEzXz2RHTLcJ0VLCY4vSRv8lGWMao0vfNMXjadtwKMgSSvR7UpssZHxcaAq33EALw_wcB etAl...

## Wednesday, 12/20

- 8:00 am Searching for social share options.
  https://www.npmjs.com/package/react-share
  https://www.makeuseof.com/what-is-api-authentication/ (odd address... about social share features)
  https://www.youtube.com/watch?v=_vUd_ex6wBw
