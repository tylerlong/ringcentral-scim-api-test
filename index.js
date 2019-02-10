import RingCentral from 'ringcentral-js-concise'

(async () => {
  const rc = new RingCentral(
    process.env.RINGCENTRAL_CLIENT_ID,
    process.env.RINGCENTRAL_CLIENT_SECRET,
    process.env.RINGCENTRAL_SERVER
  )
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD
  })

  const r = await rc.post('/scim/v2/Users', {
    emails: [
      {
        type: 'work',
        value: 'san.zhang@ringcentral.com'
      }
    ],
    name: {
      familyName: 'Zhang',
      givenName: 'San'
    },
    schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
    userName: 'san.zhang@ringcentral.com'
  })

  const user = r.data
  console.log(user)

  await rc.delete(`/scim/v2/Users/${user.id}`)

  await rc.revoke()
})()
