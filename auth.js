const MELODY_SUPABASE_URL = 'https://izecxzeqymahgonfhwvb.supabase.co';
const MELODY_SUPABASE_KEY = 'sb_publishable_qQ02IHDxYLRkJzlH05aUAQ_L4RG44jS';
const MELODY_EMPLOYEE_DOMAIN = 'melodyvc.com';

const melodyAuth = window.supabase.createClient(MELODY_SUPABASE_URL, MELODY_SUPABASE_KEY);

function getAuthRedirectUrl() {
  return new URL('auth/callback.html', window.location.origin).href;
}

function getEmployeeEmail(session) {
  return session?.user?.email || '';
}

function isMelodyEmployee(session) {
  const email = getEmployeeEmail(session).toLowerCase();
  return email.endsWith(`@${MELODY_EMPLOYEE_DOMAIN}`);
}

async function signInWithGoogle() {
  const { error } = await melodyAuth.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getAuthRedirectUrl(),
      queryParams: {
        prompt: 'select_account'
      }
    }
  });

  if (error) {
    throw error;
  }
}

async function signOutAndReturn() {
  await melodyAuth.auth.signOut();
  window.location.replace('employee-login.html');
}
