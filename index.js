import RingCentral from 'ringcentral-js-concise'

(async () => {
  const rc = new RingCentral('Nm3CXn1BS0iB8YMNj1F-eQ', 'pouI57T8Rl-D_YHLCB8V_gjzomOpOGRI2dNwh3kXVJTw', 'https://platform.devtest.ringcentral.com')

  await rc.authorize({
    username: '15178795131',
    extension: '',
    password: '20131019Yang!'
  })
  console.log(rc.token())
  await rc.revoke()
})()
