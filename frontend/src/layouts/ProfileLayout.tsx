import { Outlet, useLoaderData } from "react-router-dom"
import { ProfileBackground } from "../styles/Profile"
import { Header4, SubText, NavText } from "../styles/TextStyles"
import { NavLink } from "react-router-dom"
import UserAvatar from "../assets/img/Avatar.png"
import Button from "../components/Button"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"


interface UserData {
    "username": string,
    "email": string,
    "shot_count": number,
    "prizes_awarded": number,
} 


function ProfileLayout() {
    const { user } = useAuth()
    const [ data, setData ] = useState()

    useEffect(() => {
        setData({
            "username": "Vladdick",
            "email": "example@mail.ru",
            "shot_count": 5,
            "prizes_awarded": 1,
        })
    }, [])

    if (!data) {
        return <p>Loading</p>
    }

    return (
        <ProfileBackground>
            <div>
                <div>
                    <img src={UserAvatar} alt="profile-picture" />
                    <Header4>{user!.username}</Header4>
                    <SubText>({user!.email})</SubText>
                </div>
                <div>
                    <NavText>Сделано выстрелов: {data.shot_count}</NavText>
                    <NavText>Получено призов: {data.prizes_awarded}</NavText>
                    <NavText>Шанс попадания: ?%</NavText>
                </div>
                <nav>
                    <NavLink end to="">Список призов</NavLink>
                    <NavLink to="invitations">Приглашения на игру</NavLink>
                    <NavLink to="history">История игр</NavLink>
                </nav>
                <Button $color="red">Выйти</Button>
            </div>
            <Outlet />
        </ProfileBackground>
    )
}

export default ProfileLayout