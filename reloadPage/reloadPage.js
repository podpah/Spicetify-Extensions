/// <reference path="../globals.d.ts" />
/// <reference path="C:\Users\User\AppData\Local\spicetify\globals.d.ts" />


icon = '<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M16.2476 52C16.0842 50.6895 16 49.3548 16 48C16 30.3269 30.3269 16 48 16C58.0024 16 66.9327 20.5891 72.8007 27.7766M79.7525 44C79.9161 45.3105 80 46.6452 80 48C80 65.6731 65.6731 80 48 80C38.4425 80 29.8636 75.81 24 69.1663M36 68H24V69.1663M72.8007 16V27.7766M72.8007 27.7766V27.9997L60.8007 28M24 80V69.1663" stroke="currentcolor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
const button = new Spicetify.Topbar.Button("Reload page", icon, () => {location.reload()},false , true)
