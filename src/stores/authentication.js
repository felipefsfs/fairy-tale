import { derived, writable, get } from 'svelte/store';
import { fb } from "./firebase_init.js";

export const status = writable({waiting: true, error: null});

export const user = derived(fb, async ($fb, set) => {
  waiting();
  if (!!$fb.auth) {
    derive_auth_direct($fb, set);
    await derive_auth_redirect($fb, set);
    const stopAuthStateChanged = derive_auth_stream($fb, set);
    return stopAuthStateChanged;
  }
}, null);

function derive_auth_direct({auth} = {}, set_user) {
  const currUser = auth().currentUser;
  if (!!currUser) {
    set_user(currUser);
    waiting(false);
  } else {
    set(null);
  }
}

async function derive_auth_redirect({auth} = {}, set_user) {
  try {
    const result = await auth().getRedirectResult();
    if (result.credential) {
      //console.log("From redirect: TOKEN - ", result.credential.accessToken);
    }
    if (result.operationType === "signIn" && !!result.user.uid) {
      set_user(result.user);
      auth_err(); 
    }
    waiting(false);
  } catch (e) {
    auth_err(e);
    waiting(false);
  }
}

function derive_auth_stream({auth} = {}, set_user) {
  return auth().onAuthStateChanged(authUser => {
    waiting();
    if (!!authUser) {
      set_user(authUser);
      if (check_credential_error(authUser)) {
        auth_err();
        setWaiting(false);
        //authUser.linkWithCredential(errorMessage.credential).catch(console.log);
      } 
    } else {
      set(null);
    }
    waiting(false);
  });
}

function waiting(v=true) {
  status.update(s => {
    return {...s, waiting: v};
  });
}

function auth_err({code, message, credential, mail} = {}) {
  const other_credential = code === "auth/account-exists-with-different-credential";
  status.update(s => {
    return {...s, error: { 
      code, 
      message, 
      credential: (other_credential && credential) || s.error.credential,
      mail: (other_credential && mail) || s.error.mail } 
    };
  });
}

function check_credential_error({email} = {}) {
  const { error } = get(status);
  if (!error) return false;
  if (!!error.credential && email === error.mail) {
    return true;
  } 
  return false;
}


function clean_user(user) {
  const { uid, refreshToken, photoUrl, email, displayName, providerData } = user;
  return { 
    uid, 
    refreshToken, 
    photoUrl, 
    email, 
    displayName, 
    providerData: providerData[0] 
  };
}