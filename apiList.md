### authRouter

- POST /signup
- POST /login
- POST /logout

### profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/passwordChange

### connectionsRequestRouter

- POST /request/send/interested/:userid
- POST /request/send/ignored/:userid
- POST /request/review/accepted/:requestid
- POST /request/review/rejected/:requestid

### userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed


status - ignored, accepted, rejected, intrested