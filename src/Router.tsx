import { useState, useEffect, ReactElement} from 'react';


interface IRouter {
  path: string;
  content: ReactElement
}


const Router = ({path, content}: IRouter) => {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const handleLocationChange = () => {
      
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('navigate',  handleLocationChange);
    window.addEventListener('popstate',  handleLocationChange);

    return () => {
      window.removeEventListener('navigate', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  

  return currentPath === path ? content : null;
};

export default Router;
