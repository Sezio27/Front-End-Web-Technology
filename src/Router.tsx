import { useState, useEffect, ReactElement } from 'react';

interface IRouter {
    path: string;
    content: ReactElement
}

const Router = ({ path, content }: IRouter) => {


    const [currentPath, setCurrentPath] = useState(window.location.pathname);


    useEffect(() => {
        const handleLocationChange= () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('navigate', handleLocationChange);
        window.addEventListener('popstate', handleLocationChange);
      

        return () => {
            window.removeEventListener('navigate', handleLocationChange);
            window.removeEventListener('popstate', handleLocationChange);
           
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