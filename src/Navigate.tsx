
export const handleNavigation = (dest: string) => {
    window.history.pushState({}, "", dest);
    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  };
