import { Outlet } from "react-router-dom"
import { ProfileBackground, CredentialContainer } from "../styles/Profile"
import { Header4, SubText, NavText } from "../styles/TextStyles"
import { NavLink } from "react-router-dom"
import UserAvatar from "../assets/img/Avatar.png"
import Button from "../components/Button"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import get_stats from "../api/userstats"


interface UserData {
    "username": string,
    "email": string,
    "shot_count": number,
    "prizes_awarded": number,
} 


function ProfileLayout() {
    const { user, logout } = useAuth()
    const [ data, setData ] = useState()

    useEffect(() => {
        (async () => {
            const data = await get_stats()
            console.log(data)
            setData(data.content)
        })()
    }, [])

    if (!user || !data) {
        return <p>Loading</p>
    }

    return (
        <ProfileBackground>
            <div>
                <CredentialContainer>
                    <img src={UserAvatar} alt="profile-picture" />
                    <Header4>{user.username}</Header4>
                    <SubText>({user.email})</SubText>
                    <SubText>UID: {user.id}</SubText>
                </CredentialContainer>
                <div>
                    <NavText>Выстрелов в наличии: {data.count}</NavText>
                    <NavText>Получено призов: {data.prize_count}</NavText>
                </div>
                <nav>
                    <NavLink end to="">Список призов</NavLink>
                    <NavLink to="invitations">Приглашения на игру</NavLink>
                    <NavLink to="history">История игр</NavLink>
                </nav>
                <Button onClick={logout} $color="red">Выйти</Button>
            </div>
            <Outlet />
        </ProfileBackground>
    )
}

export default ProfileLayout