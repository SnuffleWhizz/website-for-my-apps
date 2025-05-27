function showCookiePopup(options = {}) {
    const message = options.message || "This website uses cookies to ensure you get the best experience.";
    const acceptText = options.acceptText || "Accept";
    const declineText = options.declineText || "Decline";
    const cookieName = options.cookieName || "cookieConsent";
    const days = options.days || 365;

    if (document.cookie.split('; ').find(row => row.startsWith(cookieName + '='))) {
        return; // Consent already given or declined
    }

    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.background = '#222';
    popup.style.color = '#fff';
    popup.style.padding = '16px 24px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    popup.style.zIndex = '10000';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.gap = '12px';

    const text = document.createElement('span');
    text.textContent = message;

    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = acceptText;
    acceptBtn.style.marginLeft = '8px';
    acceptBtn.onclick = () => {
        setCookie(cookieName, 'accepted', days);
        document.body.removeChild(popup);
        if (typeof options.onAccept === 'function') options.onAccept();
    };

    const declineBtn = document.createElement('button');
    declineBtn.textContent = declineText;
    declineBtn.onclick = () => {
        setCookie(cookieName, 'declined', days);
        document.body.removeChild(popup);
        if (typeof options.onDecline === 'function') options.onDecline();
    };

    popup.appendChild(text);
    popup.appendChild(acceptBtn);
    popup.appendChild(declineBtn);
    document.body.appendChild(popup);

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
    setCookie("testname", "yes", 30);
}

showCookiePopup();