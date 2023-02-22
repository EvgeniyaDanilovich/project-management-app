import React, { useEffect } from 'react';

export const WelcomePage: React.FC = () => {
    // const store = setupStore()

    // const auth = useAppSelector((state) => state.auth )

    useEffect(()=>{
        // console.log(auth);
        // console.log(store.getState());
    }, [])

    return (
        <div>
            Welcome page
        </div>
    );
};
