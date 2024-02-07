import { FlexRow } from "../styles/GlobalStyles"
import { MarginSection, Card, AttentionTitle, Grid2Row } from "../styles/HomePage"
import { RegularText } from "../styles/TextStyles"

function Home() {
	return (
		<div>
			<MarginSection>
				<Card>
					<AttentionTitle>Тот самый морской бой!</AttentionTitle>
					<p>Только с призами 🎁</p>
				</Card>
			</MarginSection>
			<MarginSection>
				<Grid2Row>
				<Card>
					<RegularText>
						Получи возможность выиграть игровые
						подарочные карты или цифровые призы играя
						в морской бой
					</RegularText>
				</Card>
				<Card>
					<RegularText>
						Зарегистрируй аккаунт с той же почтой, как на ... ,
						покупай продукцию ... и получи возможность попасть на игру.
						В каждой игре у абсолютно каждого есть возможность выиграть
					</RegularText>
				</Card>
				</Grid2Row>
			</MarginSection>
			<MarginSection>
				<p>Наши спонсоры</p>
				<Card>
					<FlexRow>
						<p>Gamerzz</p>
						<p>Battleship</p>
						<p>JustGive</p>
					</FlexRow>
				</Card>
			</MarginSection>
		</div>
	)
}

export default Home