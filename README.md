# RingCentral SCIM API test


## Setup

```
yarn install
cp .env.sample .env
```

Edit the content in `.env`


## Test

```
yarn test
```


The test tries to create a new user (san.zhang@ringcentral.com) via SCIM API, then tries to delete it.


## Issues

### Issue 1

At first I failed to create a new user.

```
Error: status: 403
statusText: Forbidden
data: {
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:Error"
  ],
  "status": "403",
  "detail": "Feature [Bulk Assign] is not available"
}
config: {
  "transformRequest": {},
  "transformResponse": {},
  "timeout": 0,
  "xsrfCookieName": "XSRF-TOKEN",
  "xsrfHeaderName": "X-XSRF-TOKEN",
  "maxContentLength": -1,
  "headers": {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8",
    "Authorization": "Bearer U0pDMTFQMDFQQVMwMHxBQUJtUUtwdmwtUURXVHplRzFPTWdrMlpjZ3hBcU5sTzF1YjhhbTVMYnNCTGxEa2dtdGpxaGJWdXFiRXUzSWMwOEc1NF9QWWRPMEVYNEhPV3FzbEwwTUtudkVoanV3UW5TZjg4RWFEc3FFZ0lVTW94aGYwX195WUJRa2dpMmM5el9ya1gyeXlmQnVtQVNiczJkVXJPUmoxVXEzeUpEaEVTeEZ4b0dZR19MVlo5bGxXXzZySy1tUnhZRjN2ZlBObzZmM0RvdlBYSmczVXE5RmhmRzY3NUxjdW58a0YxeEVRfDBtUHo3V1E1NjA4R0o5cG1VNVBKcWd8QUE",
    "X-User-Agent": "tylerlong/ringcentral-js-concise",
    "RC-User-Agent": "tylerlong/ringcentral-js-concise",
    "User-Agent": "axios/0.18.0",
    "Content-Length": 208
  },
  "method": "post",
  "url": "https://platform.devtest.ringcentral.com/scim/v2/Users",
  "data": "{\"emails\":[{\"type\":\"work\",\"value\":\"san.zhang@ringcentral.com\"}],\"name\":{\"familyName\":\"Zhang\",\"givenName\":\"San\"},\"schemas\":[\"urn:ietf:params:scim:schemas:core:2.0:User\"],\"userName\":\"san.zhang@ringcentral.com\"}"
}
```

The error message is **misleading**.

The root cause is I didn't enable SCIM in service web.


### Issue 2

After enabling SCIM in service web, I am able to create an user. But I am unable to delete it:

```
Error: status: 500
statusText: Internal Server Error
data: {
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:Error"
  ],
  "status": "500",
  "detail": "null, Internal Server Error. Consult RC Support."
}
config: {
  "transformRequest": {},
  "transformResponse": {},
  "timeout": 0,
  "xsrfCookieName": "XSRF-TOKEN",
  "xsrfHeaderName": "X-XSRF-TOKEN",
  "maxContentLength": -1,
  "headers": {
    "Accept": "application/json, text/plain, */*",
    "Authorization": "Bearer U0pDMTFQMDFQQVMwMHxBQUJtUUtwdmwtUURXVHplRzFPTWdrMlpjZ3hBcU5sTzF1YjhhbTVMYnNCTGxEa2dtdGpxaGJWdXFiRXUzSWMwOEc1NF9QWWRPMEVYNEhPV3FzbEwwTUtuS09EOTNmMjAweHc4RWFEc3FFZ0lVQ0E0UEh1NF9nRkZVaW0zOUNCOEg0S21SU3RFSGl4V3N0b3ZISXBaa0l0NFhtX1lYelBNWm8xb0dZR19MVlo5bG9IVU9sYTg2YUUtRjN2ZlBObzZmM0RqVHBEcDBIb09yckQzWjlzZ2NFb1N8a0YxeEVRfFB6SmVReHdKRDE3eU10Q1lDNkNjQ1F8QUE",
    "X-User-Agent": "tylerlong/ringcentral-js-concise",
    "RC-User-Agent": "tylerlong/ringcentral-js-concise",
    "User-Agent": "axios/0.18.0"
  },
  "method": "delete",
  "url": "https://platform.devtest.ringcentral.com/scim/v2/Users/255546004"
}
```

And I find that not only I cannot delete it via SCIM API, but also I cannot delete it in service web.

I have to disable SCIM in service web in order to delete it(the newly created user).
