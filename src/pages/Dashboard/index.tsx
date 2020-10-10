import React, {useCallback} from 'react';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {

    const { signOut } = useAuth();

    const handleClick = useCallback( () => {

        signOut();

    }, [signOut]);

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={handleClick}>SignOut</button>
        </>
    );
}


export default Dashboard;