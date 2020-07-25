export default function ({ store, app, redirect, next}) {
  // If the user is not authenticated
  const key = app.$cookies.get('access_key');
  if (typeof key === "undefined") {
     redirect('/login')
  }
}
