import React, { useCallback, useState, useEffect, useMemo } from "react";
import { isToday, format } from 'date-fns';
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { useAuth } from "../../hooks/auth";
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    NextAppoitment,
    Section,
    Appointment,
    Calendar,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiClock, FiPower } from "react-icons/fi";
import api from "../../services/api";

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface Appointment {
    id: string;
    date: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const { signOut, user } = useAuth();


    const handleDayChange = useCallback(
        (day: Date, modifiers: DayModifiers) => {
            if (modifiers.available) {
                setSelectedDate(day);
            }
        },
        []
    );

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            },
        }).then((response) => {
            setMonthAvailability(response.data);
        });
    }, [currentMonth, user.id]);

    useEffect(() => {
        api.get('appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            setAppointments(response.data);
            console.log(response.data);
        })
    }, [selectedDate])

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter(monthDay => monthDay.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day)
            });

        return dates;
    }, [currentMonth, monthAvailability]);

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "MMMM',' dd")
    }, [selectedDate])

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc');
    }, [selectedDate]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatar_url} alt={user.name} />
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
                        {isToday(selectedDate) && <span>Today</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>
                    <NextAppoitment>
                        <strong>Next appointment</strong>

                        <div>
                            <img
                                src="https://storage.googleapis.com/shawee-production.appspot.com/shawee/profilepictures/4dc708f2-87d6-4c96-b5fd-76208161a5e7.JPG"
                                alt="Tiago"
                            />
                            <strong>Tiago Vaccari</strong>
                            <span>
                                <FiClock />
                                8:00
                            </span>
                        </div>
                    </NextAppoitment>

                    <Section>
                        <strong>Morning</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                09:00
                            </span>

                            <div>
                                <img
                                    src="https://storage.googleapis.com/shawee-production.appspot.com/shawee/profilepictures/4dc708f2-87d6-4c96-b5fd-76208161a5e7.JPG"
                                    alt="Tiago"
                                />
                                <strong>Tiago Vaccari</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                10:00
                            </span>

                            <div>
                                <img
                                    src="https://storage.googleapis.com/shawee-production.appspot.com/shawee/profilepictures/4dc708f2-87d6-4c96-b5fd-76208161a5e7.JPG"
                                    alt="Tiago"
                                />
                                <strong>Tiago Vaccari</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Afternoon</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                13:00
                            </span>

                            <div>
                                <img
                                    src="https://storage.googleapis.com/shawee-production.appspot.com/shawee/profilepictures/4dc708f2-87d6-4c96-b5fd-76208161a5e7.JPG"
                                    alt="Tiago"
                                />
                                <strong>Tiago Vaccari</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                15:00
                            </span>

                            <div>
                                <img
                                    src="https://storage.googleapis.com/shawee-production.appspot.com/shawee/profilepictures/4dc708f2-87d6-4c96-b5fd-76208161a5e7.JPG"
                                    alt="Tiago"
                                />
                                <strong>Tiago Vaccari</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                        selectedDays={selectedDate}
                        onMonthChange={handleMonthChange}
                        onDayClick={handleDayChange}
                    ></DayPicker>
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;
