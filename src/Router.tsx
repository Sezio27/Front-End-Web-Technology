import { useState, useEffect, ReactElement } from 'react';

interface IRouter {
    path: string;
    content: ReactElement
}

const Router = ({ path, content }: IRouter) => {


    const [currentPath, setCurrentPath] = useState(window.location.pathname);


    useEffect(() => {
        const handleLocationChangeNav = () => {
            console.log("Navigate")
            setCurrentPath(window.location.pathname);
        };

        const handleLocationChangePop = () => {
            console.log("Pop")
            setCurrentPath(window.location.pathname);
        };

        const handleUnload = () => {

            //lav logik her for gemme data muligvis
            console.log("Unload")
        };

        window.addEventListener('navigate', handleLocationChangeNav);
        window.addEventListener('popstate', handleLocationChangePop);
        window.addEventListener('beforeunload', handleUnload)

        return () => {
            window.removeEventListener('navigate', handleLocationChangeNav);
            window.removeEventListener('popstate', handleLocationChangePop);
            window.removeEventListener('beforeunload', handleUnload)
        };
    }, []);


    return currentPath === path ? content : null;

}

export const handleNavigation = (dest: string) => {
    window.history.pushState({}, "", dest);
    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  };


  export const handlePop = () => {
    window.history.back();
  };

export default Router;