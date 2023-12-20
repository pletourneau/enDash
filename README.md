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

_Lorem ipsum milkshake brings me to the yard because I want ice cream_

## Setup/Installation Requirements

- _$ git clone (INSERT MORE HERE)_
- _$ cd (INSERT MORE HERE)_
- _$ npm install_
- _$ npm run build_
- _$ npm run start (see note)_
- _GET API ACCOUNT YADA YADA_

_{While in the root directory of the project, run `$npm install`.}_

_{If you would like to start a server when UI is added, `$ npm run start`, will open a server in your browser.}_

## Source for Production Estimates

_https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results_

## Known Bugs

- _please reach out as bugs are found! thepaulletourneau@gmail.com_

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

```
To start making API requests, the application must be authorized by the system owner. The Auth URL must be sent to the system owner via email or must be embedded in the HO App created by the developer. For the above app, Auth URL is https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=f2a479f3c6067f0d9517cadae7f00b47

4. Append Auth URL with redirect_uri

The Auth URL must be appended with redirect_uri as a query parameter and after HO approves, the authorization code is sent to this redirect_uri as a query parameter. You can provide your own Web API or webhook URL in the redirect_uri or you can use https://api.enphaseenergy.com/oauth/redirect_uri as a default redirect_uri.

If the default redirect uri is used, the final Auth URL must be similar to For the above app, Auth URL is https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=f2a479f3c6067f0d9517cadae7f00b47&redirect_uri=https://api.enphaseenergy.com/oauth/redirect_uri
```
