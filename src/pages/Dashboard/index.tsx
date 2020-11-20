import React, {useCallback} from 'react';
import { useAuth } from '../../hooks/auth';
import {    Container,
            Header,
            HeaderContent,
            Profile,
            Content,
            Schedule,
            NextAppoitment,
            Calendar
        } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from 'react-icons/fi';

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

            <Content>
                <Schedule>
                    <h1>Appointments</h1>
                    <p>
                        <span>Today</span>
                        <span>20</span>
                        <span>Friday</span>
                    </p>
                    <NextAppoitment>
                        <strong>Next appointment</strong>

                        <div>
                            <img src="https://storage.googleapis.com/shawee-production.appspot.com/shawee/profilepictures/4dc708f2-87d6-4c96-b5fd-76208161a5e7.JPG" alt="Tiago"/>
                            <strong>Tiago Vaccari</strong>
                            <span>
                                <FiClock />
                                8:00
                            </span>
                        </div>

                    </NextAppoitment>
                </Schedule>
                <Calendar />
            </Content>
        </Container>
    );
}


export default Dashboard;