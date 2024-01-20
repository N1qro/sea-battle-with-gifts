import { Outlet, useLoaderData } from "react-router-dom"
import { ProfileBackground } from "../styles/Profile"
import { Header4, SubText, NavText } from "../styles/TextStyles"
import { NavLink } from "react-router-dom"
import UserAvatar from "../assets/img/Avatar.png"
import Button from "../components/Button"
import getUserData from "../api/getUserData.ts";
import {UserProfile} from "../types/general.ts";

export async function loader() {
    const data = await getUserData()
    return data.content
}


function ProfileLayout() {
    const data = useLoaderData() as UserProfile

    return (
        <ProfileBackground>
            <div>
                <div>
                    <img src={UserAvatar} alt="profile-picture" />
                    <Header4>{data.username}</Header4>
                    <SubText>({data.email})</SubText>
                </div>
                <div>
                    <NavText>Сделано выстрелов: {data.shot_count}</NavText>
                    {/*<NavText>Получено призов: {data.prizes_awarded}</NavText>*/}
                    <NavText>Количество игр: {data.game_count}</NavText>
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