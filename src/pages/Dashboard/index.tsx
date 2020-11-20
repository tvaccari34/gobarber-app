import React, {useCallback} from 'react';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderContent, Profile } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';

const Dashboard: React.FC = () => {

    const { signOut, user } = useAuth();

    console.log(user);

    // const handleClick = useCallback( () => {

    //     signOut();

    // }, [signOut]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber"/>

                    <Profile>
                        <img src={user.avatar_url} alt={user.name}/>
                        <div>
                            <span>Welcome</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>
                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        </Container>
    );
}


export default Dashboard;