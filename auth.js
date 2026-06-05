const MELODY_SUPABASE_URL = 'https://izecxzeqymahgonfhwvb.supabase.co';
const MELODY_SUPABASE_KEY = 'sb_publishable_qQ02IHDxYLRkJzlH05aUAQ_L4RG44jS';
const MELODY_EMPLOYEE_DOMAINS = ['melodyvc.com', 'vixr.ai'];
const MELODY_TRUSTED_APP_ORIGINS = [
  'https://maestro.melodyvc.com'
];

const melodyAuth = window.supabase.createClient(MELODY_SUPABASE_URL, MELODY_SUPABASE_KEY);

function getTrustedNextUrl() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');

  if (!next) {
    return null;
  }

  try {
    const nextUrl = new URL(next);

    if (MELODY_TRUSTED_APP_ORIGINS.includes(nextUrl.origin)) {
      return nextUrl;
    }
  } catch {
    return null;
  }

  return null;
}

function getAuthRedirectUrl() {
  const trustedNextUrl = getTrustedNextUrl();
  const callbackUrl = new URL('auth/callback.html', window.location.origin);

  if (trustedNextUrl) {
    callbackUrl.searchParams.set('next', trustedNextUrl.href);
  }

  return callbackUrl.href;
}

function getEmployeeEmail(session) {
  return session?.user?.email || '';
}

function isMelodyEmployee(session) {
  const email = getEmployeeEmail(session).toLowerCase();
  return MELODY_EMPLOYEE_DOMAINS.some((domain) => email.endsWith(`@${domain}`));
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
