# User Registration
## POST: /register
### body

```json
{
	"email": "sagnikpaul@gmail.com",
	"firstName": "Sagnik",
	"lastName": "paul",
	"contactNumber": "6291048480",
	"password": "abcd12"
}
```
___


# User Login
## POST: /login
### body

```json
{
	"email": "sagnikpaul@gmail.com",
	"password": "abcd12"
}
```
___


# Auth Token Refresh
## GET: /auth/refresh
### Header : Authorization Bearer [TOKEN]

___




# Password Reset
## POST: /password/reset
### body

```json
{
	"email": "souravsunju@gmail.com",
	"token": "<GENERATE VIA /password/reset GET METHOD>",
	"newPassword": "new00"
}
```
___


# Password Change
## POST: /password/change
### Header : Authorization Bearer [TOKEN]

### body

```json
{
	"oldPassword": "old00",
	"newPassword": "new00"
}
```
___


# Password Reset
## GET: /password/reset
### body

```json
{
	"email": "souravsunju@gmail.com",
}
```

### response
```json
{
  "data": {
    "token": "e0zloZ4Chh/W/q+33GXVecd7bGwcxJCaVfrGchBuYJw="
  },
  "meta": {
    "message": "Token Generated Successfully",
    "status": "200"
  }
}
```
___

# User Dashboard Fetch
## GET: /profile/<EMAIL>
### Header : Authorization Bearer [TOKEN]

*** fetch is based on JWT token identity user. ***

___