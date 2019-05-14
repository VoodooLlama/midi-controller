import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ILoadingProps {
    isLoaded: boolean;
}

const Loading: React.FC<ILoadingProps> = ({ children, isLoaded }) => {
    return isLoaded
        ? <>{ children }</>
        : <div className="loading" >LOADING...</div>
};

export default Loading;
